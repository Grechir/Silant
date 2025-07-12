import { useEffect } from "react";
import { fetchWithToken } from "../utils/login/api";


export const usePreloadFetch = (endpoint, setInfo) => {
    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchWithToken(endpoint);
                setInfo(data.results);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error.message);
            }
        };

        load().then();
    }, []);
};

