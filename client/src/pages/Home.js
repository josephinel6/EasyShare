import axios from "axios";
import { useState, useEffect } from "react";
import CreateBox from "./CreateBox";
import Popup from 'reactjs-popup';
import Box from "./Box";


export default function Home(user) {

    const [boxes, setBoxes] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openBox, setOpenBox] = useState(null);

    console.log("Home")

    useEffect(() => {
        console.log("Call");
        axios.get('/box/get-all')
            .then((response) => {
                console.log("Called")
                setBoxes(response.data);
                console.log("line 16");
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const boxCreated = (status) => {
        console.log(status);
        if (status == true) {
            setOpenCreate(false);
            console.log("Open i sfalse");
        }
    }

    function open(box) {
        setOpenView(true);
        setOpenBox(box);
    }

    return (
        <div>
            <h>Welcome back {user.name}</h>
            <div id="user-boxes">
                {boxes && boxes.map((box) =>
                    <button class="box-card" onClick={() => open(box)}> {box.name} </button>
                )}
            </div>
            <button onClick={() => setOpenCreate(true)}> Create box </button>
            {/* <Popup trigger={<button > Create box </button>} open={open}> <CreateBox createdStatus={boxCreated} /></Popup> */}
            <Popup open={openCreate}> <CreateBox createdStatus={boxCreated} /></Popup>
            <Popup open={openView}> <Box box={openBox} /></Popup>
        </div>
    )
}