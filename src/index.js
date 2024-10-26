import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { worker } from "./msw/browser";

async function enableMocking() {
  // if (process.env.NODE_ENV !== "development") return;
  // const { worker } = await import("./msw/browser.js");
  return worker.start();
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
});
