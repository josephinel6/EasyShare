import "./App.css";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Default from "./pages/Default";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";

axios.defaults.baseURL = "http://localhost:4000";

// axios.defaults.baseURL = "https://easy-share-backend.vercel.app";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Home />} />
    </Routes>
  );
}

export default App;
