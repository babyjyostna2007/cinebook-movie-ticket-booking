import './MovieList.css';

export default function MovieList({ movies, onSelect }) {
  return (
    <div className="movie-list">
      <div className="movie-list-header">
        <h2 className="section-title">Now Showing</h2>
        <p className="section-sub">{movies.length} movies available</p>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => onSelect(movie)}>
            <div className="movie-poster">{movie.poster}</div>
            <div className="movie-info">
              <div className="movie-top">
                <span className="movie-genre">{movie.genre}</span>
                <span className="movie-imdb">⭐ {movie.imdb}</span>
              </div>
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-meta">
                <span>🕐 {movie.duration}</span>
                <span>🔞 {movie.rating}</span>
              </div>
              <div className="movie-footer">
                <span className="movie-price">₹{movie.price}</span>
                <button className="btn-book">Book Now →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}