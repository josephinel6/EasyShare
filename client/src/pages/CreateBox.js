import "../styles/create-box.css"
import { useState } from "react"
import axios from "axios";

export default function CreateBox({ createdStatus }) {

    const [name, setName] = useState("");

    async function createNewBox(ev) {
        ev.preventDefault();
        try {
            await axios.post('/box/create', {
                name
            }).then((box) => {
                console.log(box.data)
                alert(box.data.name + " created successfully. The code is " + box.data.code);
                createdStatus(true);
            })
        } catch (err) {
            alert("Operation failed" + err);
        }
    }

    function close() {
        createdStatus(true);
    }

    return (
        <div id="create-box-popup">
            {/* <div> Create a box </div> */}
            <button className="close-button" onClick={() => close()}>x </button>
            <input maxLength={50} type="text" placeholder="Box name" onChange={ev => setName(ev.target.value)} />
            <button className="styled-button" id="create-box-button" onClick={createNewBox}>Create</button>
        </div>
    )
}