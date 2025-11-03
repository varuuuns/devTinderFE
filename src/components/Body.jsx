import { Outlet, useNavigate } from "react-router-dom"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import axios from "axios"
import { VITE_BACKEND_URL } from "../config"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);

    const handleUser = async () => {
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}/profile/view`, {
                withCredentials:true
            })

            dispatch(addUser(response.data));
        }
        catch (err) {
            if(err.status === 401) navigate("/login");
            console.log(`err from body.jsx: ${err}`);
        }
    }


    useEffect(() => {
        handleUser();
    }, []);


    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Body;