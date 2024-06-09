import "../styles/box.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Box({ box, boxOpen, open }) {

    console.log(box);

    const [shares, setShares] = useState(null);

    const code = box.code;

    useEffect(() => {
        axios.get('/box/shares/' + code).then((response) => {
            setShares(response.data);
            console.log(response.data);
        })
    }, [box])

    console.log(shares);

    function deleteShare(id) {
        console.log(id);

        axios.post("/box/delete-share", {
            id
        }).then(
            (response) => {
                alert("Successfully deleted share");
                console.log(response)
                axios.get('/box/shares/' + code).then((response) => {
                    setShares(response.data);
                })
            })
            .catch(err => {
                console.log(err);
                alert("Deletion failed");
            })
    }

    function deleteBox() {
        axios.post("/box/delete", {
            code
        })
            .then(
                (response) => {
                    alert("Deleted successfully");
                    boxOpen(false);
                })
            .catch(err => {
                console.log(err);
                alert("Deletion failed");
            })

    }


    return (
        <div id="wrapper">
            <div id="box-contents" style={open ? {} : { display: 'none' }} >
                <button className="close-button" onClick={() => boxOpen(false)}>x </button>
                <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteBox()} id="delete-box" />
                <div id="shares">
                    <h1 id="box-name"> {box.name}</h1>
                    <h3 id="box-code"> Code: {box.code} </h3>
                    {shares && shares.map((share) =>
                        <div className="share">
                            <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteShare(share._id)} value={share._id} className="delete-share" />
                            <p >{share.share} </p></div>
                    )}</div>
            </div>
        </div>
    )
}