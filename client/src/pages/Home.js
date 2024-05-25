import axios from "axios";
import { useState, useEffect } from "react";
import CreateBox from "./CreateBox";
import Popup from 'reactjs-popup';


export default function Home(user) {

    return (
        <div>
            <h>Welcome back {user.name}</h>
            <div id="user-boxes">
                {user.boxes != null && user.boxes.map((box) =>
                    <div id="box-card"> box.name </div>
                )}
            </div>
            <Popup trigger={<button > Create box </button>} > <CreateBox /></Popup>
        </div>
    )
}