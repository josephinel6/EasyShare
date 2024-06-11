import "../styles/welcome.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import SubmitShare from "./SubmitShare";
import Popup from "reactjs-popup";

export default function Welcome() {

    const [code, setCode] = useState("");
    const [formOpen, setFormOpen] = useState(false);

    async function processClass() {
        axios.get('/box/verify', { code: code })
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    setFormOpen(response.data);
                } else {
                    alert("Box does not exist");
                }
            })
    }

    const changeViewStatus = (status) => {
        setFormOpen(status);
    }

    return (
        <div id="welcome-page" className="center">
            <input id="enter-class-code" placeholder="00000000" onChange={e => setCode(e.target.value)} />
            <br />
            <div className="break"></div>
            <button className="styled-button" id="enter-class" onClick={() => processClass()}> Enter class </button>
            <br></br>
            <Link to={'/register'} id="register" className="register-login"> Register</Link>
            <Link to={'/login'} id="login" className="register-login"> Log in</Link>
            <Popup open={formOpen}> <SubmitShare code={code} openCallback={changeViewStatus} /></Popup>
        </div>
    )
}