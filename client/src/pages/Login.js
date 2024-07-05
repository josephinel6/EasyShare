import { useEffect, useState } from "react"
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/register-login.css"

export default function Register() {

    useEffect(() => {
        console.log("Call");
        axios.post('/user')
            .then((response) => {
                if (response.data) {
                    navigate('/');
                }
            })
    }, [])


    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function processLogin(e) {
        console.log("Recieved")
        e.preventDefault();
        // try {
        //     await axios.post('/login', {
        //         email,
        //         password,
        //     })
        //         .then((token) => {
        //             localStorage.setItem("token", JSON.stringify(token));
        //         })
        //     alert("Login successful");
        //     navigate('/');
        // } catch {
        //     alert("Registration failed");
        // }
        try {
            await axios.post('/login', {
                email,
                password
            })
            alert("Login successful");
            navigate('/');
        } catch {
            alert("Login failed");
        }
    }

    return (
        <form onSubmit={processLogin} className="center">
            <input type="email" className="field" placeholder="someone@example.com" value={email} onChange={ev => setEmail(ev.target.value)} />
            <br />
            <input type="password" className="field" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} />
            <br />
            <button className="styled-button form-submission">Login</button>
            <div className="small-text"> Need an account? <Link to={'/register'}> Register </Link> </div>
            <div className="small-text"> Need to share? <Link to={'/'}> Enter code </Link> </div>
        </form>
    )
}