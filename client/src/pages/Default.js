import Welcome from "./Welcome";
import Home from "./Home";
import axios from "axios";

export default function Default() {
    // axios.get('/user').then(({ data }) => {
    //     console.log(data)
    // });
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") != null) {
        return <Home />
    } else {
        console.log("User is null");
        return <Welcome />
    }
}