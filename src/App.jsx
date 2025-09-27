import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Dashboard/Home";
import CreateTournament from "./Components/CreateTournament";
import EventPage from "./Components/Dashboard/EventPage";
import TournamentDetails from "./Components/TournamentDetails";
import DocsPage from "./Components/DocsPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTournament />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/tournament/:id" element={<TournamentDetails />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  );
}

export default App;
