import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ReactGA from 'react-ga';

ReactGA.initialize('G-C52EWWXFT6');

ReactGA.pageview(window.location.pathname + window.location.search);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
