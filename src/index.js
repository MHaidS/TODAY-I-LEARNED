// 50. Installing Node.js & Setting Up A React Project
// ===> delete the lines that are commented out below:

// 51. Meeting JSX & Creating the App Component
// ===> 'index.js' is the 1st js file that is going to be loaded; here 'App' is being imported fr 'App.js'["./App"], then 'App.js'["./App"] must be exported  as well
import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
