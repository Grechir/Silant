import React from "react";
import styles from "./InfoText.module.css"

const InfoText = ({ activeTab }) => {
    const texts = {
        machine: "Информация о комплектации и технических характеристиках Вашей техники",
        maintenance: "Информация о проведенных ТО Вашей техники",
        complaint: "Информация о Ваших рекламациях",
    };

    return <p className={styles.title}>{texts[activeTab]}</p>;
};

export default InfoText;
