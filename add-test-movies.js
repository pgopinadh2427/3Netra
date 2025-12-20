const testMovies = [
  {
    movieName: "Inception",
    releaseYear: 2010,
    language: "English",
    sourceUrl: "https://example.com/inception.mp4",
    notes: "Sci-fi thriller directed by Christopher Nolan",
    duration: 148
  },
  {
    movieName: "The Dark Knight",
    releaseYear: 2008,
    language: "English",
    sourceUrl: "https://example.com/dark-knight.mp4",
    notes: "Batman vs Joker",
    duration: 152
  },
  {
    movieName: "Interstellar",
    releaseYear: 2014,
    language: "English",
    sourceUrl: "https://example.com/interstellar.mp4",
    notes: "Space exploration adventure",
    duration: 169
  },
  {
    movieName: "Dune",
    releaseYear: 2021,
    language: "English",
    sourceUrl: "https://example.com/dune.mp4",
    notes: "Sci-fi epic on Arrakis",
    duration: 155
  },
  {
    movieName: "The Matrix",
    releaseYear: 1999,
    language: "English",
    sourceUrl: "https://example.com/matrix.mp4",
    notes: "Reality is a simulation",
    duration: 136
  }
];

async function addTestMovies() {
  for (const movie of testMovies) {
    try {
      const response = await fetch('http://localhost:5000/api/public/registered-videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Added: ${movie.movieName} (ID: ${result.id})`);
      } else {
        console.log(`❌ Failed to add: ${movie.movieName} - ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Error adding ${movie.movieName}: ${error.message}`);
    }
  }
}

addTestMovies();