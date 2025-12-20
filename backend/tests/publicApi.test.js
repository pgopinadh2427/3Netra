const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGO_URI = mongoUri;
  app = require('../app');
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Public API', () => {
  it('should list registered videos (empty)', async () => {
    const res = await request(app).get('/api/public/registered-videos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a registered video', async () => {
    const videoData = {
      movieName: 'Test Movie',
      releaseYear: 2023,
      language: 'English',
      sourceUrl: 'http://example.com/video.mp4',
      duration: 120
    };
    const res = await request(app)
      .post('/api/public/registered-videos')
      .send(videoData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toMatch(/^REG-/);
    expect(res.body.movieName).toEqual('Test Movie');
    expect(res.body.status).toEqual('processing');
  });

  it('should list registered videos after creation', async () => {
    const res = await request(app).get('/api/public/registered-videos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].movieName).toEqual('Test Movie');
  });

  it('should get a registered video by id', async () => {
    const listRes = await request(app).get('/api/public/registered-videos');
    const id = listRes.body[0].id;
    const res = await request(app).get(`/api/public/registered-videos/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(id);
  });

  it('should add a match to a video', async () => {
    const listRes = await request(app).get('/api/public/registered-videos');
    const id = listRes.body[0].id;
    const matchData = { match: 'some match data' };
    const res = await request(app)
      .post(`/api/public/registered-videos/${id}/matches`)
      .send(matchData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.matches).toContain('some match data');
  });

  it('should return 404 for non-existent video', async () => {
    const res = await request(app).get('/api/public/registered-videos/REG-nonexistent');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Not found');
  });

  it('should handle add match to non-existent video', async () => {
    const res = await request(app)
      .post('/api/public/registered-videos/REG-nonexistent/matches')
      .send({ match: 'data' });
    expect(res.statusCode).toEqual(404);
  });
});