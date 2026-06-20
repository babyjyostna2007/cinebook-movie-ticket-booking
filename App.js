import { useState } from 'react';
import MovieList from './components/MovieList';
import SeatMap from './components/SeatMap';
import BookingSummary from './components/BookingSummary';
import BookingConfirmation from './components/BookingConfirmation';
import './App.css';

const MOVIES = [
  {
    id: 1,
    title: 'Interstellar',
    genre: 'Sci-Fi',
    duration: '2h 49m',
    rating: 'PG-13',
    imdb: '8.6',
    price: 220,
    poster: '🚀',
    times: ['10:00 AM', '1:30 PM', '5:00 PM', '9:00 PM'],
    bookedSeats: [2, 5, 11, 18, 23, 30, 35, 42],
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: 'Action',
    duration: '2h 32m',
    rating: 'PG-13',
    imdb: '9.0',
    price: 250,
    poster: '🦇',
    times: ['11:00 AM', '2:00 PM', '6:00 PM', '10:00 PM'],
    bookedSeats: [1, 3, 7, 14, 20, 28, 33, 40, 45],
  },
  {
    id: 3,
    title: 'Avatar',
    genre: 'Fantasy',
    duration: '2h 42m',
    rating: 'PG-13',
    imdb: '7.9',
    price: 300,
    poster: '🌿',
    times: ['9:00 AM', '12:30 PM', '4:00 PM', '8:00 PM'],
    bookedSeats: [4, 9, 16, 21, 27, 34, 39, 46, 50],
  },
  {
    id: 4,
    title: 'Inception',
    genre: 'Thriller',
    duration: '2h 28m',
    rating: 'PG-13',
    imdb: '8.8',
    price: 230,
    poster: '🌀',
    times: ['10:30 AM', '2:30 PM', '6:30 PM', '9:30 PM'],
    bookedSeats: [6, 12, 19, 25, 31, 38, 44, 48],
  },
  {
    id: 5,
    title: 'Spider-Man',
    genre: 'Action',
    duration: '2h 28m',
    rating: 'PG-13',
    imdb: '8.2',
    price: 200,
    poster: '🕷️',
    times: ['9:30 AM', '1:00 PM', '5:30 PM', '8:30 PM'],
    bookedSeats: [8, 13, 22, 29, 36, 41, 47],
  },
  {
    id: 6,
    title: 'Oppenheimer',
    genre: 'Drama',
    duration: '3h 0m',
    rating: 'R',
    imdb: '8.9',
    price: 270,
    poster: '💥',
    times: ['11:30 AM', '3:00 PM', '7:00 PM', '10:30 PM'],
    bookedSeats: [10, 15, 24, 32, 37, 43, 49],
  },
];

export default function App() {
  const [step, setStep] = useState('movies');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState(null);
  const [userName, setUserName] = useState('');
  const [movies, setMovies] = useState(MOVIES);

  function handleMovieSelect(movie) {
    setSelectedMovie(movie);
    setSelectedTime(movie.times[0]);
    setSelectedSeats([]);
    setStep('seats');
  }

  function handleSeatToggle(seatNumber) {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  }

  function handleProceed() {
    if (selectedSeats.length === 0) return;
    setStep('summary');
  }

  function handleConfirm() {
    if (!userName.trim()) return;

    const bookingId = 'BK' + Date.now().toString().slice(-6);
    const newBooking = {
      bookingId,
      userName: userName.trim(),
      movie: selectedMovie,
      time: selectedTime,
      seats: selectedSeats.sort((a, b) => a - b),
      totalPrice: selectedSeats.length * selectedMovie.price,
      bookedAt: new Date(),
    };

    setMovies((prev) =>
      prev.map((m) =>
        m.id === selectedMovie.id
          ? { ...m, bookedSeats: [...m.bookedSeats, ...selectedSeats] }
          : m
      )
    );

    setBooking(newBooking);
    setStep('confirmation');
  }

  function handleReset() {
    setStep('movies');
    setSelectedMovie(null);
    setSelectedTime('');
    setSelectedSeats([]);
    setUserName('');
    setBooking(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="header-logo">🎬</span>
          <div>
            <h1 className="header-title">CineBook</h1>
            <p className="header-sub">Your ultimate movie booking experience</p>
          </div>
        </div>
        {step !== 'movies' && (
          <button className="btn-back" onClick={handleReset}>
            ← Back to Movies
          </button>
        )}
      </header>

      <div className="step-indicator">
        {['movies', 'seats', 'summary', 'confirmation'].map((s, i) => (
          <div key={s} className="step-item">
            <div className={`step-circle ${step === s ? 'active' : ['seats', 'summary', 'confirmation'].indexOf(s) < ['movies', 'seats', 'summary', 'confirmation'].indexOf(step) ? 'done' : ''}`}>
              {i + 1}
            </div>
            <span className="step-label">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </span>
          </div>
        ))}
      </div>

      <main className="app-main">
        {step === 'movies' && (
          <MovieList movies={movies} onSelect={handleMovieSelect} />
        )}
        {step === 'seats' && (
          <SeatMap
            movie={selectedMovie}
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
            selectedSeats={selectedSeats}
            onSeatToggle={handleSeatToggle}
            onProceed={handleProceed}
            onBack={handleReset}
          />
        )}
        {step === 'summary' && (
          <BookingSummary
            movie={selectedMovie}
            time={selectedTime}
            seats={selectedSeats}
            userName={userName}
            onUserNameChange={setUserName}
            onConfirm={handleConfirm}
            onBack={() => setStep('seats')}
          />
        )}
        {step === 'confirmation' && (
          <BookingConfirmation
            booking={booking}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}