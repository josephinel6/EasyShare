import Welcome from "./Welcome";
import Home from "./Home";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Default() {

    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);

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
        axios.get('/user').then((response) => {
            console.log("Called")
            setUser(response);
        })
    }, [])

    if (user == null) {
        return <Welcome />
    }

    return <Home user={user} />

    // console.log("Test")
    // axios.get('/user').then((data) => {
    //     if (data) {
    //         console.log("Home");
    //         return <Home />
    //     } else {
    //         console.log("Welcome")
    //         return <Welcome />
    //     }
    // });
    // if (document.cookie != null) {
    //     return (<Home />)
    // } else {
    //     console.log("User is null");
    //     return (<Welcome />)
    // }

    // return (<Home />)

    // return (
    //     // <div> Test </div>
    //     <div>
    //         <Welcome />
    //     </div>
    // )
}