const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { Server } = require("http");

app.use(express.json());

app.get("/beers", (req, res) => {
  res.sendFile(path.join(`${__dirname}/beers.json`));
});

app.post("/beers/add", (req, res) => {
  const newBeerData = {
    name: req.body.name,
    tagline: req.body.tagline,
    abv: req.body.abv,
  };

  fs.readFile(`${__dirname}/beers.json`, (err, data) => {
    if (err) {
      console.log("hiba:", err);
      res.status(500).send("hibavan");
    } else {
      const beerData = JSON.parse(data);
      beerData.push(newBeerData);

      fs.writeFile(
        `${__dirname}/beers.json`,
        JSON.stringify(beerData, null, 4),
        (err) => {
          if (err) {
            console.log("error", err);
            return res.status(500).send(err);
          } else {
            return res.json(newBeerData);
          }
        }
      );
    }
  });
});

app.listen(9000, () => {
  console.log("http://127.0.0.1:9000");
});
