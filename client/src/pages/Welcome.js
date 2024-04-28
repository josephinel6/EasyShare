import "./Welcome.css"

export default function Welcome() {
    return (
        <div id="welcome-page">
            <input type="number" id="enter-class-code" placeholder="000000" />
            <br />
            <div class="break"></div>
            <button id="enter-class"> Enter class </button>
        </div>
    )
}