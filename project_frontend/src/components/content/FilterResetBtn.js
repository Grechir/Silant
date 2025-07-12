import React from "react";
import styles from './FilterResetBtn.module.css'

const FilterResetBtn = ({resetFilters, selectedFilters}) => {

    return (
        <div>
            <button
                className={styles.resetButton}
                onClick={resetFilters}
                disabled={Object.keys(selectedFilters).length === 0}
            >
                Сбросить все фильтры
            </button>
        </div>
    )
}

export default FilterResetBtn