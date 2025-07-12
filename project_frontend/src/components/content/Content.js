import React, {useState} from "react";
import Search from "./Search";
import SearchResults from "./SearchResults";
import ClientDashboard from "./dashboard/ClientDashboard"
import content from "./Content.module.css";


const isAuthenticated = !!localStorage.getItem('access_token');

const Content = () => {
    const [searchResults, setSearchResults] = useState(null)

    return isAuthenticated ? (
        <div className={content.containerWrapper}>
            <div className={content.container}>

                <ClientDashboard info={searchResults} setInfo={setSearchResults} />

            </div>
        </div>
    ) : (
        <div className={content.containerWrapper}>
            <div className={content.container}>

                <p className={content.title}>Проверьте комплектацию и технические характеристики техники Силант</p>

                <Search onResults={setSearchResults}/>
                <p className={content.text}>Результаты поиска:</p>
                <SearchResults info={searchResults} />

            </div>
        </div>
    );
};

export default Content;
