import React from "react";
import styles from "./TabButtons.module.css"

const tabs = [
    { id: 'machine', label: 'Машина'},
    { id: 'maintenance', label: 'ТО'},
    { id: 'complaint', label: 'Рекламации'},
];

const TabButtons = ({activeTab, onChange}) => {
    return (
        <div className={styles.buttons}>
            {tabs.map(tab => (
                <button className={styles.button}
                    key={tab.id}
                    onClick={() =>
                        onChange(tab.id)}
                    disabled={activeTab === tab.id}
                >
                    {tab.label}
                </button>
            ))};
        </div>
    )

}

export default TabButtons
