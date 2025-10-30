import { useDispatch, useSelector } from "react-redux"
import { VITE_BACKEND_URL } from "../config"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { FeedCard } from "./FeedCard";

export const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);

    const getFeed = async () => {
        if (feed) return;
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}/api/v1/feed`, {
                withCredentials: true
            });

            dispatch(addFeed(response.data));
        }
        catch (err) {
            console.log(`error from feed.jsx: ${err}`);
        }
    }

    useEffect(() => {
        if (!feed) getFeed();
    }, [feed]);



    return (
        feed &&
        <>
            <div className="flex justify-center my-10">
                <FeedCard user={feed[0]} />
            </div>
        </>
    )
}