import './BookingConfirmation.css';

export default function BookingConfirmation({ booking, onReset }) {
  const convenience = Math.round(booking.totalPrice * 0.05);
  const grandTotal = booking.totalPrice + convenience;

  return (
    <div className="confirm-wrapper">
      <div className="confirm-card">
        <div className="confirm-icon">🎉</div>
        <h2 className="confirm-heading">Booking Confirmed!</h2>
        <p className="confirm-sub">Your tickets have been booked successfully</p>

        <div className="ticket">
          <div className="ticket-header">
            <span className="ticket-poster">{booking.movie.poster}</span>
            <div>
              <h3 className="ticket-title">{booking.movie.title}</h3>
              <p className="ticket-meta">{booking.movie.genre} · {booking.movie.rating}</p>
            </div>
            <div className="ticket-id">
              <p className="ticket-id-label">Booking ID</p>
              <p className="ticket-id-val">{booking.bookingId}</p>
            </div>
          </div>

          <div className="ticket-divider">
            <div className="notch left" />
            <div className="dashed-line" />
            <div className="notch right" />
          </div>

          <div className="ticket-body">
            <div className="ticket-row">
              <div className="ticket-field">
                <p className="field-label-t">Passenger</p>
                <p className="field-val">{booking.userName}</p>
              </div>
              <div className="ticket-field">
                <p className="field-label-t">Show Time</p>
                <p className="field-val">{booking.time}</p>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-field">
                <p className="field-label-t">Seats</p>
                <p className="field-val seats-list">
                  {booking.seats.join(', ')}
                </p>
              </div>
              <div className="ticket-field">
                <p className="field-label-t">Tickets</p>
                <p className="field-val">{booking.seats.length}</p>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-field">
                <p className="field-label-t">Booked On</p>
                <p className="field-val">{booking.bookedAt.toLocaleString()}</p>
              </div>
              <div className="ticket-field">
                <p className="field-label-t">Amount Paid</p>
                <p className="field-val total-paid">₹{grandTotal}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="confirm-actions">
          <button className="btn-new-booking" onClick={onReset}>
            🎬 Book Another Movie
          </button>
        </div>
      </div>
    </div>
  );
}