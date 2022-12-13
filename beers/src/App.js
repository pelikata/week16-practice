import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import LoadingMask from "./components/LoadingMask";
import Beers from "./components/Beers";

function App() {
  const [beers, setBeers] = useState([]);
  const [name, setName] = useState("");
  const [abv, setAbv] = useState(0);
  const [tagline, setTagline] = useState("");

  const fetchBeers = () => {
    fetch("/beers")
      .then((res) => res.json())
      .then((data) => setBeers(data));
  };

  const addBeer = () => {
    fetch("/beers/add", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        tagline: tagline,
        abv: abv,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchBeers();
      });
  };

  useEffect(() => fetchBeers(), []);

  console.log(beers);

  return (
    <div className="app">
      {beers.length > 0 ? (
        <>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="tagline"
            value={tagline}
            onChange={(event) => {
              setTagline(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="abv"
            value={abv}
            onChange={(event) => {
              setAbv(event.target.value);
            }}
          />
          <button
            onClick={() => {
              addBeer();
            }}
          >
            Add beer
          </button>
          <Beers beers={beers} />
        </>
      ) : (
        <LoadingMask />
      )}
    </div>
  );
}

export default App;
