import { useState, useEffect } from "react";
import {fetchWithToken} from "../utils/login/api";

export const useProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchWithToken('http://127.0.0.1:8000/api/profile/')
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setProfile(data.results[0])
                }
            })
            .catch(console.error)
    }, []);

    return profile
}