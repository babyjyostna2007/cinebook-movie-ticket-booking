import './BookingSummary.css';

export default function BookingSummary({
  movie, time, seats, userName,
  onUserNameChange, onConfirm, onBack
}) {
  const totalPrice = seats.length * movie.price;
  const convenience = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + convenience;

  return (
    <div className="summary-wrapper">
      <div className="summary-card">
        <h2 className="summary-title">Booking Summary</h2>

        <div className="summary-section">
          <div className="summary-movie-banner">
            <span className="summary-poster">{movie.poster}</span>
            <div>
              <h3 className="summary-movie-name">{movie.title}</h3>
              <p className="summary-movie-meta">{movie.genre} · {movie.duration} · {movie.rating} · ⭐ {movie.imdb}</p>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-row">
            <span className="summary-label">Show Time</span>
            <span className="summary-value">{time}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Seats</span>
            <span className="summary-value seats-value">
              {seats.sort((a, b) => a - b).join(', ')}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">No. of Tickets</span>
            <span className="summary-value">{seats.length}</span>
          </div>
        </div>

        <div className="summary-section price-section">
          <div className="summary-row">
            <span className="summary-label">Ticket Price</span>
            <span className="summary-value">₹{movie.price} × {seats.length}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Subtotal</span>
            <span className="summary-value">₹{totalPrice}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Convenience Fee (5%)</span>
            <span className="summary-value">₹{convenience}</span>
          </div>
          <div className="summary-row total-row">
            <span className="summary-label">Grand Total</span>
            <span className="summary-value total-val">₹{grandTotal}</span>
          </div>
        </div>

        <div className="summary-section">
          <label className="field-label">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
            placeholder="Enter your name to confirm booking"
            className="name-input"
          />
        </div>

        <div className="summary-actions">
          <button className="btn-back-sum" onClick={onBack}>← Back</button>
          <button
            className="btn-confirm"
            onClick={onConfirm}
            disabled={!userName.trim()}
          >
            Confirm & Pay ₹{grandTotal}
          </button>
        </div>
      </div>
    </div>
  );
}