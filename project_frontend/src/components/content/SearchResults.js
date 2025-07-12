import React from "react";
import styles from './SearchResults.module.css';
import PublicMachineTable from "./tables/PublicMachineTable";

const SearchResults = ({info}) => {
    console.log(info)

    if (!info) {
        return null
    }

    if (info.length === 0) {
        return (
            <p className={styles.noResultsText}>⚠️ По вашему запросу ничего не найдено</p>
        )
    }

    return (
        <div className={styles.searchResultsWrapper}>
            <p className={styles.resultText}>
                Информация о комплектации и технических характеристиках Вашей техники
            </p>
            <div className={styles.searchResults}>
                <PublicMachineTable machines={info}/>
            </div>
        </div>
    );
};

export default SearchResults;
