import React from "react";
import styles from './FilterHeaderCell.module.css'

const FilterHeaderCell = ({ label, filterKey, values, selectedValue, onChange }) => {
    return(
        <th>
            {/* Заголовок и стрелка */}
            <div>
                {label}
            </div>

            {/* Выпадающий список */}
            <div>
                <select
                    className={styles.select}
                    value={selectedValue || ''}
                    onChange={(event) => {
                        onChange(filterKey, event.target.value || null);
                    }}
                >
                    <option value=''>Все</option>
                    {values.map((v) => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </select>
            </div>


        </th>
    )

}

export default FilterHeaderCell;
