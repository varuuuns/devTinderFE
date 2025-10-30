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
    if (connections.length === 0) return <div>No connections</div>

    return (
        <>
            <div>
                <div>Connections</div>
                {connections.map((connec) => {
                    <div>
                        <img className="w-80 h-80" src={connec.photoUrl} alt="pic" />
                        <h2>{connec.firstName + " " + connec.className}</h2>
                        <p>{connec.about}</p>
                        <p>{connec.age + " " + connec.gender}</p>
                    </div>
                })}
            </div>
        </>
    )
}