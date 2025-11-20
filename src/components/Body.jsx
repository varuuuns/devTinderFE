import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import axios from "axios"
import { VITE_BACKEND_URL } from "../config"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);

    const fetchUser = async () => {
        if(userData) return;
        try {
            const res = await axios.get(`${VITE_BACKEND_URL}/profile/view`, {
                withCredentials: true,
            });

            dispatch(addUser(res.data));
        }
        catch (err) {
            if (err.status === 401) navigate("/login");
            console.error(err);
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body;