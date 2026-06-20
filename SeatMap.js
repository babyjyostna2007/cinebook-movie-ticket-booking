import './SeatMap.css';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SEATS_PER_ROW = 10;
const TOTAL_SEATS = ROWS.length * SEATS_PER_ROW;

export default function SeatMap({
  movie, selectedTime, onTimeChange,
  selectedSeats, onSeatToggle, onProceed
}) {
  const availableCount = TOTAL_SEATS - movie.bookedSeats.length - selectedSeats.length;

  function getSeatStatus(seatNumber) {
    if (movie.bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  }

  return (
    <div className="seatmap-wrapper">
      <div className="seatmap-left">
        <div className="movie-banner">
          <span className="banner-poster">{movie.poster}</span>
          <div>
            <h2 className="banner-title">{movie.title}</h2>
            <p className="banner-meta">{movie.genre} · {movie.duration} · {movie.rating}</p>
          </div>
        </div>

        <div className="time-select-group">
          <label className="field-label">Select Show Time</label>
          <div className="time-options">
            {movie.times.map((time) => (
              <button
                key={time}
                className={`time-btn ${selectedTime === time ? 'time-active' : ''}`}
                onClick={() => onTimeChange(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="seat-legend">
          <div className="legend-item">
            <div className="legend-box available-box" /> Available
          </div>
          <div className="legend-item">
            <div className="legend-box selected-box" /> Selected
          </div>
          <div className="legend-item">
            <div className="legend-box booked-box" /> Booked
          </div>
        </div>

        <div className="seat-stats">
          <div className="stat-pill">
            <span className="pill-label">Available</span>
            <span className="pill-val green">{availableCount}</span>
          </div>
          <div className="stat-pill">
            <span className="pill-label">Selected</span>
            <span className="pill-val yellow">{selectedSeats.length}</span>
          </div>
          <div className="stat-pill">
            <span className="pill-label">Total Price</span>
            <span className="pill-val yellow">₹{selectedSeats.length * movie.price}</span>
          </div>
        </div>

        <button
          className="btn-proceed"
          onClick={onProceed}
          disabled={selectedSeats.length === 0}
        >
          Proceed to Summary ({selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''})
        </button>
      </div>

      <div className="seatmap-right">
        <div className="screen-wrapper">
          <div className="screen" />
          <p className="screen-label">SCREEN</p>
        </div>

        <div className="seat-grid">
          {ROWS.map((row, rowIndex) => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                const seatNumber = rowIndex * SEATS_PER_ROW + i + 1;
                const status = getSeatStatus(seatNumber);
                return (
                  <button
                    key={seatNumber}
                    className={`seat seat-${status}`}
                    onClick={() => status !== 'booked' && onSeatToggle(seatNumber)}
                    disabled={status === 'booked'}
                    title={`${row}${i + 1}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
              <span className="row-label">{row}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}