const Movie = require('../models/Movie');
const crypto = require('crypto');

const inMemory = { videos: [] };

const generateHash = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex');
};

const toClient = (movie) => {
  if (!movie) return null;
  return {
    id: movie.externalId || `REG-${movie._id || Date.now()}`,
    movieName: movie.movieName,
    releaseYear: movie.releaseYear,
    language: movie.language,
    sourceUrl: movie.sourceUrl,
    notes: movie.notes,
    duration: movie.duration,
    fingerprints: movie.fingerprints || [],
    status: movie.status || 'processing',
    createdAt: movie.createdAt || new Date().toISOString(),
    matches: movie.detectedMatches || movie.matches || [],
  };
};

exports.listRegisteredVideos = async (req, res) => {
  try {
    if (Movie && Movie.find) {
      const docs = await Movie.find({ externalId: { $exists: true } }).sort({ createdAt: -1 }).limit(200).lean();
      return res.json(docs.map(toClient));
    }
  } catch (err) {
    console.warn('DB list error, falling back to memory', err.message);
  }
  return res.json(inMemory.videos);
};

exports.getRegisteredVideo = async (req, res) => {
  const id = req.params.id;
  try {
    if (Movie && Movie.findOne) {
      const doc = await Movie.findOne({ externalId: id }).lean();
      if (doc) return res.json(toClient(doc));
    }
  } catch (err) {
    console.warn('DB get error, fallback', err.message);
  }
  const v = inMemory.videos.find((x) => x.id === id);
  if (!v) return res.status(404).json({ message: 'Not found' });
  return res.json(v);
};

exports.createRegisteredVideo = async (req, res) => {
  const { movieName, releaseYear, language, sourceUrl, notes, duration } = req.body || {};
  const id = `REG-${Date.now()}`;
  const record = {
    externalId: id,
    movieName,
    releaseYear,
    language,
    sourceUrl,
    notes,
    duration,
    fingerprints: [],
    status: 'processing',
    createdAt: new Date(),
  };

  // try persist
  try {
    if (Movie && Movie.create) {
      const created = await Movie.create(record);
      // simulate async fingerprint processing
      setTimeout(async () => {
        const fp = { id: generateHash(sourceUrl + id), length: duration || 0 };
        created.fingerprints = created.fingerprints || [];
        created.fingerprints.push(fp);
        created.status = 'ready';
        await created.save();
      }, 1000);
      return res.status(201).json(toClient(created));
    }
  } catch (err) {
    console.warn('DB create error, falling back to memory', err.message);
  }

  inMemory.videos.push(record);
  setTimeout(() => {
    record.fingerprints.push({ id: generateHash(sourceUrl + id), length: duration || 0 });
    record.status = 'ready';
  }, 1000);

  return res.status(201).json(record);
};

exports.addMatch = async (req, res) => {
  const id = req.params.id;
  const { match } = req.body || {};
  try {
    if (Movie && Movie.findOne) {
      const doc = await Movie.findOne({ externalId: id });
      if (doc) {
        doc.detectedMatches = doc.detectedMatches || [];
        doc.detectedMatches.push(match);
        await doc.save();
        return res.json(toClient(doc));
      }
    }
  } catch (err) {
    console.warn('DB addMatch error, fallback', err.message);
  }
  const v = inMemory.videos.find((x) => x.id === id);
  if (!v) return res.status(404).json({ message: 'Not found' });
  v.matches = v.matches || [];
  v.matches.push(match);
  return res.json(v);
};

exports.migrateExternalIds = async (req, res) => {
  try {
    if (!Movie || !Movie.find) {
      return res.status(500).json({ message: 'DB not available' });
    }
    const docs = await Movie.find({ externalId: { $exists: false } });
    let updated = 0;
    for (const doc of docs) {
      doc.externalId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await doc.save();
      updated++;
    }
    return res.json({ message: `Migrated ${updated} documents` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};