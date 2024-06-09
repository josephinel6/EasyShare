import "../styles/create-box.css"
import { useState } from "react"
import axios from "axios";

export default function CreateBox({ viewStatus }) {

    const [name, setName] = useState("");
    const [created, setCreated] = useState(false);
    const [box, setBox] = useState(null);

    async function createNewBox(ev) {
        ev.preventDefault();
        try {
            await axios.post('/box/create', {
                name
            }).then((box) => {
                setBox(box.data);
                // console.log(box.data);
                // setCreated(true);
            })
        } catch (err) {
            alert("Operation failed" + err);
        }
    }

    function close() {
        viewStatus(false);
    }

    return (
        <div id="create-box-popup">
            {/* <div> Create a box </div> */}
            <button className="close-button" onClick={() => close()}>x </button>
            {box ?
                <div>
                    <p id="creation-confirmation"> {box.name} created successfully. The code is {box.code}.</p>
                </div> :
                <div>
                    <input maxLength={50} type="text" placeholder="Box name" onChange={ev => setName(ev.target.value)} id="enter-box-name" />
                    <button className="styled-button" id="create-box-button" onClick={createNewBox}>Create</button>
                </div>}

        </div>
    )
}