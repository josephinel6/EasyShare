import { useEffect, useState } from "react"
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function processLogin(e) {
        console.log("Recieved")
        e.preventDefault();
        try {
            await axios.post('/login', {
                email,
                password,
            })
                .then((token) => {
                    localStorage.setItem("token", JSON.stringify(token));
                })
            alert("Login successful");
            navigate('/');
        } catch {
            alert("Registration failed");
        }
    }

    return (
        <form onSubmit={processLogin} className="center">
            <input type="email" placeholder="someone@example.com" value={email} onChange={ev => setEmail(ev.target.value)} />
            <br />
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
            <br />
            <button className="styled-button">Login</button>
            <div> Need an account? <Link to={'/register'}> Register </Link> </div>
            <div> Need to share? <Link to={'/'}> Enter code </Link> </div>
        </form>
    )
}