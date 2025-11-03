import axios from "axios"
import { VITE_BACKEND_URL } from "../config"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"
import { Link } from "react-router-dom"

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.getConnections);

    const getConnections = async () => {
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}/user/connections`, {
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
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>

            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    connection;

                return (
                    <div key={_id}
                        className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={photoUrl}/>
                        </div>
                        <div className="text-left mx-4 ">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <Link to={"/chat/" + _id}>
                            <button className="btn btn-primary">Chat</button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Connections;