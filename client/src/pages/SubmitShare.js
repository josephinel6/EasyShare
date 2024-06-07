import { useState } from "react"
import axios from "axios";

export default function SubmitShare({ code }) {

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
            })
            .catch((err) => {
                console.log(err);
                alert("Sorry, share failed");
            })
    }

    return (
        <div>
            <input type="text" placeholder="Share!" onChange={(e) => { setShare(e.target.value) }}></input>
            <button onClick={() => submit()}> Submit </button>
        </div>
    )
}