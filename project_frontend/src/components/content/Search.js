import React, {useState} from "react";
import search from "./Search.module.css"
import { fetchWithToken } from "../../utils/login/api";
import { handleEnter } from "../../utils/handle/handleEnter"

const Search = ({onResults}) => {
    const [query, setQuery] = useState([])

    const handleSearch = async () => {
        try {
            const data = await fetchWithToken(`http://127.0.0.1:8000/api/public/machine/?search=${query}`);
            onResults(data.results);
        } catch (error) {
            console.error('Ошибка поиска:', error)
            onResults([]);  // очищаем
        }
    }

    return (
        <div className={search.bar}>
            <input
                className={search.placeholder}
                placeholder='Заводской номер'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => handleEnter(event, handleSearch)}
            />
            <button className={search.button} onClick={handleSearch}>Поиск</button>
        </div>
    )
}

export default Search