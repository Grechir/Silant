import React from "react";
import styles from "../../../styles/TableStyles.module.css"

const MachineTable = ({machines}) => {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Модель техники</th>
                    <th>Зав. № машины</th>
                    <th>Модель двигателя</th>
                    <th>Зав. № двигателя</th>
                    <th>Модель трансмиссии</th>
                    <th>Зав. № трансмиссии</th>
                    <th>Модель ведущего моста</th>
                    <th>Зав. № ведущего моста</th>
                    <th>Модель управляемого моста</th>
                    <th>Зав. № управляемого моста</th>
                </tr>
                </thead>
                <tbody>
                {machines.map((m) => (
                    <tr key={m.id || m.serial_number}>
                        <td>{m.model_data?.name}</td>
                        <td>{m.serial_number}</td>
                        <td>{m.engine_data?.name}</td>
                        <td>{m.engineID}</td>
                        <td>{m.transmission_data?.name}</td>
                        <td>{m.transmissionID}</td>
                        <td>{m.drivingAxle_data?.name}</td>
                        <td>{m.drivingAxleID}</td>
                        <td>{m.controlledAxle_data?.name}</td>
                        <td>{m.controlledAxleID}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default MachineTable
