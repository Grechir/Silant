import React, {useEffect, useState} from "react";
import styles from '../../../styles/Dashboard.module.css'
import {fetchWithToken} from "../../../utils/login/api";

import TabButtons from "../TabButtons";
import InfoText from "../InfoText";


import MaintenanceTable from "../tables/MaintenanceTable";
import ComplaintTable from "../tables/ComplaintTable";
import MachineMenu from "../MachineMenu";

const MachineDashboard = ({ machine, activeTab, setActiveTab, onBack }) => {
    const [info, setInfo] = useState([]);
    const [currentMachine, setCurrentMachine] = useState(null)

    // Обертка на fetchWithToken /////////////////////
    const endpoints = {
        'machine': 'http://127.0.0.1:8000/api/machine/',
        'maintenance': 'http://127.0.0.1:8000/api/maintenance/',
        'complaint': 'http://127.0.0.1:8000/api/complaint/'
    }

    const handleFetch = async (type) => {
      setActiveTab(type);

      try {
        if (type === 'machine') {
          // запрашиваем одну машину
          const updatedMachine = await fetchWithToken(`http://127.0.0.1:8000/api/machine/${machine.id}/`);
          setCurrentMachine(updatedMachine);
          setInfo([]); // очищаем список, тк для машины список не нужен
        } else {
          // запрашиваем список maintenance или complaint и фильтруем
          const endpoint = endpoints[type];
          const data = await fetchWithToken(endpoint);
          const filtered = data.results.filter(item => item.machine === machine.id);
          setInfo(filtered);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error.message);
        setInfo([]);
      }
    };

    // предзагрузка данных
    useEffect(() => {
        handleFetch(activeTab);
    }, []);

    // пока данные машины не загрузились, компонент не отображается
    if (!currentMachine) return <p>Загрузка машины...</p>;

    return (
        <div className={styles.clientDashboardWrapper}>
            <button onClick={onBack} className={styles.backButton}>← Назад</button>
            <h2 className={styles.title}>
                <span>Модель: <span className={styles.highlight}>{currentMachine.model_data.name}</span></span>
                <span>Серийный номер: <span className={styles.highlight}>{currentMachine.serial_number}</span></span>
            </h2>
            <InfoText activeTab={activeTab} className={styles.text}/>
            <TabButtons activeTab={activeTab} onChange={handleFetch}/>
            <div className={styles.table}>
                {activeTab === 'machine'&& <MachineMenu machine={currentMachine} />}
                {activeTab === "maintenance" && <MaintenanceTable maintenance={info} disableMachineFilter={true} />}
                {activeTab === "complaint" && <ComplaintTable complaint={info} />}
            </div>
        </div>
    );
};

export default MachineDashboard