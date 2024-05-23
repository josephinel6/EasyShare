import "../styles/Welcome.css"
import { Link } from "react-router-dom"

export default function Welcome() {
    return (
        <div id="welcome-page" className="center">
            <input type="number" id="enter-class-code" placeholder="000000" />
            <br />
            <div className="break"></div>
            <button className="styled-button" id="enter-class"> Enter class </button>
            <br></br>
            <Link to={'/register'}> Register</Link>
            <br></br>
            <Link to={'/login'}> Log in</Link>
        </div>
    )
}