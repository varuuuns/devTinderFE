import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { VITE_BACKEND_URL } from "../config";
import { useDispatch } from "react-redux";

export const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const response = await axios.patch(`${VITE_BACKEND_URL}/profile/edit`, {
                firstName, lastName, age, gender, about
            }, { withCredentials: true });
            dispatch(addUser(response?.data.data));
        }
        catch (err) {
            console.log(`error from editProfile fe: ${err}`);
        }
    }

    return (
        <>
            <div className="flex items-center justify-center my-8">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Edit Profile</legend>

                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={"https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" || user?.photoUrl} alt="user avatar" />
                        </div>
                    </div>

                    <label className="label">First Name</label>
                    <input
                        type="text"
                        className="input"
                        placeholder={user?.firstName || "Enter first name"}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label className="label">Last Name</label>
                    <input
                        type="text"
                        className="input"
                        placeholder={user?.lastName || "Enter last name"}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label className="label">Age</label>
                    <input
                        type="number"
                        className="input"
                        placeholder={user?.age?.toString() || "Enter age"}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <label className="label">Gender</label>
                    <input
                        type="text"
                        className="input"
                        placeholder={user?.gender || "Enter gender"}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />

                    <label className="label">About</label>
                    <input
                        type="text"
                        className="input"
                        placeholder={user?.about || "Write something about yourself"}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />

                    <button className="btn btn-neutral mt-4 hover:bg-gray-700" onClick={saveProfile}>Save</button>
                </fieldset>
            </div>

            <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </>
    );
};