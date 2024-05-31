import Welcome from "./Welcome";
import Home from "./Home";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    console.log(user);

    if (user) {
        return <Home />
    } else {
        return <Welcome />
    }
}