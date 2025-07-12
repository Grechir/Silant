import React, {useState} from "react";
import styles from '../../../styles/Dashboard.module.css'

import {fetchWithToken} from "../../../utils/login/api";
import {usePreloadFetch} from "../../../hooks/usePreloadFetch";
import {useProfile} from "../../../hooks/useProfile";

import MachineTable from "../tables/MachineTable";
import MaintenanceTable from "../tables/MaintenanceTable";
import ComplaintTable from "../tables/ComplaintTable";
import TabButtons from "../TabButtons";
import InfoText from "../InfoText";
import MachineDashboard from "./MachineDashboard";

const ClientDashboard = ({info, setInfo}) => {
    const [activeTab, setActiveTab] = useState('machine');
    const [selectedMachine, setSelectedMachine] = useState(null);

    const profile = useProfile();

    // Обертка на fetchWithToken /////////////////////
    const endpoints = {
        'machine': 'http://127.0.0.1:8000/api/machine/',
        'maintenance': 'http://127.0.0.1:8000/api/maintenance/',
        'complaint': 'http://127.0.0.1:8000/api/complaint/'
    }

    const handleFetch = async (type) => {
        setActiveTab(type);

        const endpoint = endpoints[type];

        try {
            const data = await fetchWithToken(endpoint);
            setInfo(data.results);
            console.log(data.results)
        } catch (error) {
            console.log('Ошибка загрузки данных:', error.message)
        }
    };

    // Предзагрузка данных
    usePreloadFetch(endpoints[activeTab], setInfo)  // Предзагрузка
    if (!info) return null;

    // открытие меню конкретной машины
    if (selectedMachine) {
    return (
        <MachineDashboard
            machine={selectedMachine}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onBack={() => {
                setActiveTab('machine');
                setSelectedMachine(null);
                handleFetch('machine');
            }
            }
        />
        );
    }

    // Блок с основным выводом компоненты /////////////////////
    return (
        <div className={styles.clientDashboardWrapper}>
            <h2
                className={styles.title}>{profile.company_name}
            </h2>
            <InfoText activeTab={activeTab} />
            <TabButtons activeTab={activeTab} onChange={handleFetch} />
            <div className={styles.table}>
                {activeTab === 'machine' && <MachineTable machines={info} onSelectMachine={setSelectedMachine} />}
                {activeTab === 'maintenance' && <MaintenanceTable maintenance={info} />}
                {activeTab === 'complaint' && <ComplaintTable complaint={info} />}
            </div>
        </div>
    )
}

export default ClientDashboard;
