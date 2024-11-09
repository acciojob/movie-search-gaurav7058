import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const getApi = () => {
    fetch(`https://www.omdbapi.com/?apikey=99eb9fd1&s=${query}`)
      .then(res => res.json())
      .then(json => {
        if (json.Response === "True") {
          setMovies(json.Search);
          setError('');
        } else {
          setError("Invalid movie name. Please try again.");
          setMovies([]);
        }
      });
  };

  return (
    <div>
      <div className='container'>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Search Movies</h1>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title..."
          />
          <button onClick={getApi}>Search</button>
        </form>

        {movies.map((item, id) => (
          <div className="movie" key={id}>
            <ul>
              <li>
                <h1>{item.Title} ({item.Year})</h1>
                <img src={item.Poster} alt={item.Title} />
              </li>
            </ul>
          </div>
        ))}

        {error && (
          <div className="error">
            <h1>{error}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
