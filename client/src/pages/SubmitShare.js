import { useState } from "react"
import axios from "axios";
import "../styles/submit-share.css"

export default function SubmitShare({ code, openCallback }) {

    const [share, setShare] = useState("");

    console.log(code);

    async function submit() {
        await axios.post('/box/share',
            {
                code: code.toString(),
                share: share
            })
            .then(() => {
                alert("Thanks for sharing!");
                openCallback(false);
            })
            .catch((err) => {
                console.log(err);
                alert("Sorry, share failed");
            })
    }

    return (
        <center>
            <div id="submit-share">
                <button className="close-button" onClick={() => openCallback(false)}>x </button>
                <textarea type="text" id="write-share" placeholder="Share!" rows={10} onChange={(e) => { setShare(e.target.value) }}></textarea>
                <br></br>
                {/* <div id="house-submit-button"> */}
                <button onClick={() => submit()} class="styled-button" id="submit-share-button"> Submit </button></div>
            {/* </div> */}
        </center>
    )
}