import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../config";
import { removeUser } from "../utils/userSlice";

export const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${VITE_BACKEND_URL}/api/v1/logout`, {}, {
                withCredentials: true
            })
            dispatch(removeUser());
            return navigate("/login");
        }
        catch (err) {
            console.log(`error from navbar.jsx: ${err}`);
        }
    }

    return (
        <>
            <div className="navbar bg-base-300 shadow-sm">
                <div className="flex-1 mx-5">
                    <Link to="/" className="btn btn-ghost text-xl hover:bg-gray-700">DevTinder</Link>
                </div>
                {user && <div className="flex gap-2">
                    <p>Welcome, {user.firstName}</p>
                    <div className="dropdown dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user photo" src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>}
            </div>
        </>
    )
}