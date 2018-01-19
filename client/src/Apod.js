import React from "react";

const ApodContent = ({ apod }) => (
  <div className="ApodContent">
    <h3>{apod.title}</h3>
    <img src={apod.url} alt={apod.title} />
    <p>{apod.explanation}</p>
  </div>
);

const Apod = ({ apod, isFetching }) => {
  return (
    <div className="Apod">
      <h1>Astronomy Picture of the Day</h1>
      {isFetching ? <p>Loading...</p> : <ApodContent apod={apod} />}
    </div>
  );
};

export default Apod;
