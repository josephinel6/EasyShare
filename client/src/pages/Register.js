import { useEffect, useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Call");
        axios.get('/user')
            .then((response) => {
                if (response.data) {
                    navigate('/');
                }
            })
    }, [])

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function processRegistration(e) {
        console.log("Recieved")
        e.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            })
            alert("Registration successful");
            navigate('/');
        } catch {
            alert("Registration failed");
        }
    }

    return (
        <form onSubmit={processRegistration} className="center">
            <input type="text" placeholder="name" value={name} onChange={ev => setName(ev.target.value)} />
            <br />
            <input type="email" placeholder="someone@example.com" value={email} onChange={ev => setEmail(ev.target.value)} />
            <br />
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
            <br />
            <button className="styled-button">Register</button>
            <div> Already have an account? <Link to={'/login'}> Login </Link> </div>
            <div> Need to share? <Link to={'/'}> Enter code </Link> </div>
        </form>
    )
}