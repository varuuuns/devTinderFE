import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile"

export const Profile = () => {
    const userData = useSelector(store => store.user);
    return (
        <>
            Profile
            <EditProfile user={userData} />
        </>
    )
}