"use strict";

// Require es6-promise polyfill and isomorphic-fetch
require("es6-promise").polyfill();
require("isomorphic-fetch");

// Require and configure dotenv
// Then set const for our API key
require("dotenv").config();
const NASA_API_KEY = process.env.NASA_API_KEY;
const baseUrl = "https://api.nasa.gov";

// Require express and set up app to use it
const express = require("express");
const app = express();

// Set development port to 3001
app.set("port", process.env.PORT || 3001);

// When in production, only serve static assets
// from the client/build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Extract check status function for reuse
function checkStatus(response) {
  // If response not okay, throw an error
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  // Otherwise just return the response
  return response;
}

// Extract fetch's json parsing function for reuse
function parseJSON(response) {
  return response.json();
}

app.get("/api/apod", (req, res, next) => {
  console.log("Requesting APOD data from NASA...");

  fetch(`${baseUrl}/planetary/apod?api_key=${NASA_API_KEY}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      // Sends a json response from Express
      res.json(json);
    })
    .catch(error => {
      next(error);
    });
});

// Defines next action for errors
function errorHandler(err, req, res, next) {
  console.error("Error: ", err.stack);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
}

app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
