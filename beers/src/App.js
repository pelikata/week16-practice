import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import LoadingMask from "./components/LoadingMask";
import Beers from "./components/Beers";

function App() {
  const [beers, setBeers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("asc");

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?per_page=${perPage}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setBeers(data);
        }, 3000);
        console.log(beers);
      });
  }, [perPage]);

  useEffect(() => {
    sortBy === "asc"
      ? setBeers((beers) => beers.sort((a, b) => (a.name > b.name ? -1 : 1)))
      : setBeers((beers) => beers.sort((a, b) => (a.name < b.name ? -1 : 1)));
  }, [sortBy]);

  /* useEffect(() => {
    sortBy === "asc"
      ? setBeers((beers) =>
          beers.sort((a, b) => a.name > b.name ? 1 : -1)
        )
      : setBeers((beers) =>
          beers.sort((a, b) => a.name < b.name ? 1 : -1)
        );
  }, [sortBy])

useEffect(() => {
    sortBy === "asc"
      ? setBeers([...beers].sort((a, b) => a.name > b.name ? 1 : -1)
        )
      : setBeers([...beers].sort((a, b) => a.name < b.name ? 1 : -1)
        );
  }, [sortBy]) */
  return (
    <div className="App">
      <input
        type="number"
        value={perPage}
        onChange={(event) => {
          setPerPage(event.target.value);
        }}
      />
      <p>Find your favourite beer</p>
      <input
        type="text"
        placeholder="Search for a beer"
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />

      <button
        onClick={() => {
          sortBy === "asc" ? setSortBy("desc") : setSortBy("asc");
        }}
      >
        Sortby {sortBy}
      </button>

      <p>Filter</p>

      {beers.length > 0 ? (
        <Beers beers={beers} filter={filter} />
      ) : (
        <LoadingMask />
      )}
    </div>
  );
}

export default App;
