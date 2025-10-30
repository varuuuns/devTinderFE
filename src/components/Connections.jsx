import axios from "axios"
import { VITE_BACKEND_URL } from "../config"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"

export const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.getConnections);

    const getConnections = async () => {
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}/connections`, {
                withCredenials: true,
            })
            dispatch(addConnections(response.data.data));
        }
        catch (err) {
            console.log(`error from connections fe: ${err}`);
        }
    }

    useEffect(() => {
        getConnections();
    }, []);

    if (!connections) return;
    if(connections.length===0) 

    return (
        <>

        </>
    )
}