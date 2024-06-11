import axios from "axios";
import "../styles/home.css"
import { useState, useEffect } from "react";
import CreateBox from "./CreateBox";
import Popup from 'reactjs-popup';
import Box from "./Box";
import { useNavigate } from "react-router-dom";


export default function Home({ user }) {

    const navigate = useNavigate();

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

    const createBoxOpen = (status) => {
        console.log(status);
        setOpenCreate(status);
        axios.get('/box/get-all')
            .then((response) => {
                console.log("Called")
                setBoxes(response.data);
                console.log("line 16");
            })
    }

    function open(box) {
        setOpenBox(box);
        setOpenView(true);
    }

    const boxOpen = (status) => {
        console.log(status);
        if (status == false) {
            setOpenView(false);
        }
        axios.get('/box/get-all')
            .then((response) => {
                setBoxes(response.data);
            })
    }

    console.log(user);

    return (
        <div>
            <h2 id="welcome-statement">Welcome back, {user.name}! </h2>
            <br></br>
            <div id="user-boxes">
                <button onClick={() => setOpenCreate(true)} id="create-box" className="box-card"> + </button>
                <Popup open={openCreate}> <CreateBox viewStatus={createBoxOpen} className="box-card" /></Popup>
                {boxes && boxes.map((box) =>
                    <button className="box-card" onClick={() => open(box)}> {box.name} </button>
                )}
            </div>
            {/* <Popup trigger={<button > Create box </button>} open={open}> <CreateBox createdStatus={boxCreated} /></Popup> */}
            {/* <Box box={openBox} style={openView ? {} : { display: 'none' }} /> */}
            {openBox ? <Box openCallback={boxOpen} box={openBox} open={openView} /> : <div />}
        </div>
    )
}