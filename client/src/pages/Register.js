import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register-login.css";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Call");
    axios.post("/user").then((response) => {
      if (response.data) {
        navigate("/");
      }
    });
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function processRegistration(e) {
    console.log("Recieved");
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful");
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  }

  return (
    <form onSubmit={processRegistration} className="center">
      <input
        type="text"
        className="field"
        placeholder="Name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <br />
      <input
        type="email"
        className="field"
        placeholder="someone@example.com"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <br />
      <input
        type="password"
        className="field"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <br />
      <button className="styled-button form-submission">Register</button>
      <div className="small-text">
        {" "}
        Already have an account? <Link to={"/login"}> Login </Link>{" "}
      </div>
      <div className="small-text">
        {" "}
        Need to share? <Link to={"/"}> Enter code </Link>{" "}
      </div>
    </form>
  );
}
