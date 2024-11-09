
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  function getApi(){
    fetch(`https://www.omdbapi.com/?apikey=99eb9fd1&s=${query}`).then(res=>res.json()).then(json=>{
      if(json.Response=="True"){
        setMovies(json.Search);
        console.log(json.Search)
        setError("")
      }
      else{
        setError("Invalid movie name. Please try again.");
        setMovies([])
      }
    });
  }

  return (
    <div>
        <div className='container'>
      <form action="" onClick={(e)=>e.preventDefault()}>
      <h1>Search Movies</h1>
      <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)}></input>
      <button onClick={getApi}>Search</button>
      </form>
      {
        movies.map((item,id)=>{
          return(
            <div className="" key={id}>
                <ul>
                  <li>
                  <h1>{item.Title} ({item.Year})</h1>
                  </li>
                  <li>
                  <img src={item.Poster} alt="" />
                  </li>
                </ul>
            </div>
          )
        })
      }
      <div className="error">
         <h1>{error}</h1>
      </div>
    </div>
    </div>
  )
}

export default App
