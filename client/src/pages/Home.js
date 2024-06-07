import axios from "axios";
import "../styles/home.css"
import { useState, useEffect } from "react";
import CreateBox from "./CreateBox";
import Popup from 'reactjs-popup';
import Box from "./Box";


export default function Home(user) {

    const [boxes, setBoxes] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openBox, setOpenBox] = useState({});

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
            axios.get('/box/get-all')
                .then((response) => {
                    console.log("Called")
                    setBoxes(response.data);
                    console.log("line 16");
                })
        }
    }

    function open(box) {
        setOpenView(true);
        setOpenBox(box);
    }

    function logout() {
        //* do this
        axios.post('/logout');
    }

    return (
        <div>
            <h>Welcome back {user.name}</h>
            <br></br>
            <div id="user-boxes">
                <button onClick={() => setOpenCreate(true)} id="create-box" className="box-card"> + </button>
                <CreateBox createdStatus={boxCreated} open={openCreate} />
                {boxes && boxes.map((box) =>
                    <button className="box-card" onClick={() => open(box)}> {box.name} </button>
                )}
            </div>
            {/* <Popup trigger={<button > Create box </button>} open={open}> <CreateBox createdStatus={boxCreated} /></Popup> */}
            {/* <Box box={openBox} style={openView ? {} : { display: 'none' }} /> */}
            <Box box={openBox} open={openView} />
            <button onClick={() => logout()} id="logout" className="styled-button"> Logout </button>
        </div>
    )
}