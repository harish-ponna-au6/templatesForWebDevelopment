import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Container />
    </div>
  );
}
