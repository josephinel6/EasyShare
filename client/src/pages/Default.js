import Welcome from "./Welcome";
import Home from "./Home";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"

export default function Default() {

    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!loaded) {
    //         axios.get('/user').then(({ data }) => {
    //             setLoaded(true);
    //             setUser(data);
    //         });
    //     }
    // }, []);

    useEffect(() => {
        console.log("Call");
        axios.get('/user')
            .then((response) => {
                console.log(response.data)
                setUser(response.data);
            })
            .catch((err) => {
                setUser(null);
            })
    }, [])


    function logout() {
        //* do this
        axios.post('/logout').then((respose) => {
            setUser(null);
        })
    }

    console.log(user);

    if (user) {
        return <div>            <button onClick={() => logout()} id="logout" className="styled-button"> Logout </button>

            <Home user={user} /></div>
    } else {
        return <Welcome />
    }
}