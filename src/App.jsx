import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Dashboard/Home";
import CreateTournament from "./Components/CreateTournament";
import EventPage from "./Components/Dashboard/EventPage";
import TournamentDetails from "./Components/TournamentDetails";
import DocsPage from "./Components/DocsPage";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import PutGame from "./Components/PutGame.jsx";
import User from "./Components/User.jsx";
import Notification from "./Components/Notification.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/integrateGame" element={<PutGame />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/create" element={<CreateTournament />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </>
  );
}

export default App;
