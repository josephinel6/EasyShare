import { useState } from "react"
import axios from "axios";

export default function CreateBox() {

    const [name, setName] = useState("");

    console.log("Create box")

    async function createNewBox(ev) {
        ev.preventDefault();
        try {
            await axios.post('/box/create', {
                name
            })
            alert(name + "Created successfully");
        } catch {
            alert("Operation failed");
        }
    }

    return (
        <div id="test">
            <input style={{ margin: "200px" }} type="text" placeholder="Box name" onChange={ev => setName(ev.target.value)} />
            <button className="styled-button" onClick={createNewBox}>Create</button>
        </div>
    )
}