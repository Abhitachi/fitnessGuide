import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8bfdff3cb9msh49c84a4ae48334ap114700jsnea18b1fb10b1",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    let response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises?limit=50`,
      options
    );
    let newData = await response.json();
    console.log(newData);
    setData(newData);
    setFilteredData(newData);
  };

  const filterData = (move) => {
    let newData = data.filter((item) => {
      if (item.name.toLowerCase().includes(move.toLowerCase())) {
        return true;
      }
      if (item.target.toLowerCase().includes(move.toLowerCase())) {
        return true;
      }
    });
    setFilteredData(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Your Fitness Guide</h1>
      <input
        type="text"
        name="search"
        placeholder="Search your Move"
        onChange={(e) => filterData(e.target.value)}
      />
      <button>Search</button>

      <div className="container">
        {filteredData.map((e, index) => {
          return (
            <div key={index} className="singleContainer">
              <h3>{e.name}</h3>
              <img src={e.gifUrl} alt={e.bodyPart} className="image" />
              <p>{e.target}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
