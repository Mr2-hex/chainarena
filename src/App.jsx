import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Dashboard/Home";
import CreateTournament from "./Components/CreateTournament";
import EventPage from "./Components/Dashboard/EventPage";
import TournamentDetails from "./Components/TournamentDetails";
import DocsPage from "./Components/DocsPage";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreateTournament />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/tournament/:id" element={<TournamentDetails />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  );
}

export default App;
