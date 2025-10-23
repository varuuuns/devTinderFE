import axios from "axios";
import { useState } from "react"
import { VITE_BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate("");
    const dispatch = useDispatch();


    const handleLogin = async () => {
        try {
            const response = await axios.post(`${VITE_BACKEND_URL}/api/v1/login`, {
                email: email,
                password: password
            }, { withCredentials: true })

            dispatch(addUser(response.data));
            return navigate("/");
        }
        catch (err) {
            setError(err?.response?.data || "something went wrong");
            console.log(`error from login.jsx :${err}`);
        }
    }

    return (
        <>
            <div className="flex items-center justify-center my-35 ">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Login</legend>

                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="text-red-600">{error}</p>
                    <button className="btn btn-neutral mt-4 hover:bg-gray-700" onClick={handleLogin}>Login</button>
                </fieldset>
            </div>
        </>
    )
}