import { useEffect, useState } from "react"

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerUser(e) {
        e.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            })
            alert("Registration successful");
        } catch {
            alert("Registration failed");
        }
    }

    return (
        <div>
            <input placeholder="Name" />
            <input placeholder="Email" type="email" />
            <input placeholder="Password" type="password" />
            <button class="styled-button"> Register </button>
        </div>
    )
}