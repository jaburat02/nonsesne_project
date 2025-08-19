import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Offline from "./features/pages/Offline";
import NotFound from "./features/pages/NotFound";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/offline" element={<Offline />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
