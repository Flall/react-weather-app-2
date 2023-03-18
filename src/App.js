import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Amsterdam" />
        <footer>
          Coded by{" "}
          <a
            href="https://www.linkedin.com/in/francescalalli/"
            className="footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Francesca Lalli
          </a>
          , open-sourced on
          <a
            href="https://github.com/Flall/react-weather-app"
            target="_blank"
            rel="noopener noreferrer"
            className="footer"
          >
            {" "}
            GitHub{" "}
          </a>
          and hosted on
          <a
            href="https://playful-ganache-ddc540.netlify.app"
            className="footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Netlify
          </a>{" "}
        </footer>
      </div>
    </div>
  );
}
