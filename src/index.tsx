import React from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import App from "./App.tsx";

const root = createRoot(document.getElementById("root"));

root.render(<App />);