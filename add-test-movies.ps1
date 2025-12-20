$movies = @(
    @{
        movieName = "Inception"
        releaseYear = 2010
        language = "English"
        sourceUrl = "https://example.com/inception.mp4"
        notes = "Sci-fi thriller directed by Christopher Nolan"
        duration = 148
    },
    @{
        movieName = "The Dark Knight"
        releaseYear = 2008
        language = "English"
        sourceUrl = "https://example.com/dark-knight.mp4"
        notes = "Batman vs Joker"
        duration = 152
    },
    @{
        movieName = "Interstellar"
        releaseYear = 2014
        language = "English"
        sourceUrl = "https://example.com/interstellar.mp4"
        notes = "Space exploration adventure"
        duration = 169
    }
)

foreach ($movie in $movies) {
    $json = $movie | ConvertTo-Json
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000/api/public/registered-videos" -Method POST -Body $json -ContentType "application/json"
        $result = $response.Content | ConvertFrom-Json
        Write-Host "✅ Added: $($movie.movieName) (ID: $($result.id))"
    } catch {
        Write-Host "❌ Failed to add: $($movie.movieName) - $($_.Exception.Message)"
    }
}