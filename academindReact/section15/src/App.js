import React from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const fetchHandler = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{
      const resp = await fetch("Https://swapi.dev/api/films");
      if (!resp.ok) {
        console.log(resp);
        throw new Error(`Failed to fetch, code: ${resp.status}`)
      }
      const data = await resp.json();
      const adjustedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date
        }
      })
      setMovies(adjustedMovies);
    } catch(error) {
      setError("Error: " + error);
    }
    setIsLoading(false);
  }, []);


  React.useEffect(() => {
    fetchHandler()
  }, []);
  
  let content = <p>Found no movies. Please fetch.</p>;
  if (error) {
    content = <p>{error}</p>;
  }
  else if (isLoading) {
    content = <p>Loading ...</p>;
  } else if (movies.length == 0) {
    content = <p>No movies. Please push fetch.</p>
  } else if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
