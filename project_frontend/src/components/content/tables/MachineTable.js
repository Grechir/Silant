import React from "react";
import styles from "../../../styles/TableStyles.module.css"
import { Tooltip } from "react-tooltip";
import '../../../index.css'

// импорты для модальных окон
import Modal from '../Modal'
import {modalConfig} from '../../../configs/modalConfig'
import { useDescriptionModal } from "../../../hooks/useDescriptionModal";

// импорты для фильтров
import FilterHeaderCell from "../FilterHeaderCell";
import FilterResetBtn from "../FilterResetBtn";
import {machineFilterConfig} from "../../../configs/filterConfig/machineFilterConfig";
import {useFilteredData} from "../../../hooks/useFilteredData";


const MachineTable = ({machines, onSelectMachine}) => {

    // Модальные окна
    const {
        modalText,
        showModal,
        handleCellClick,
        setShowModal,
    } = useDescriptionModal(modalConfig);

    // фильтры
    const {
        filters,
        filteredData,
        selectedFilters,
        onFilterChange,
        resetFilters,
    } = useFilteredData(machines, machineFilterConfig)

    return (
        <>
        <FilterResetBtn resetFilters={resetFilters} selectedFilters={selectedFilters} />
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <FilterHeaderCell
                        label='Модель техники'
                        filterKey='model'
                        values={filters.model || []}
                        selectedValue={selectedFilters.model}
                        onChange={onFilterChange}
                    />
                    <th>Зав. № машины</th>
                    <th>Дата отгрузки с завода</th>
                    <FilterHeaderCell
                        label='Модель двигателя'
                        filterKey='engine'
                        values={filters.engine || []}
                        selectedValue={selectedFilters.engine}
                        onChange={onFilterChange}
                    />
                    <th>Зав. № двигателя</th>
                    <FilterHeaderCell
                        label='Модель трансмиссии'
                        filterKey='transmission'
                        values={filters.transmission || []}
                        selectedValue={selectedFilters.transmission}
                        onChange={onFilterChange}
                    />
                    <th>Зав. № трансмиссии</th>
                    <FilterHeaderCell
                        label='Модель ведущего моста'
                        filterKey='drivingAxle'
                        values={filters.drivingAxle || []}
                        selectedValue={selectedFilters.drivingAxle}
                        onChange={onFilterChange}
                    />
                    <th>Зав. № ведущего моста</th>
                    <FilterHeaderCell
                        label='Модель управляемого моста'
                        filterKey='controlledAxle'
                        values={filters.controlledAxle || []}
                        selectedValue={selectedFilters.controlledAxle}
                        onChange={onFilterChange}
                    />
                    <th>Зав. № управляемого моста</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((m) => (
                    <tr key={m.id || m.serial_number}>
                        <td
                            className={styles.clickableCell}
                            onClick={handleCellClick(m, 'Модель техники')}>{m.model_data?.name}
                        </td>

                        <td
                            data-tooltip-id="serial-tooltip"
                            data-tooltip-content="🔍 Открыть меню машины"
                            onClick={() => onSelectMachine(m)}
                            className={styles.serialLinkCell}
                        >
                            {m.serial_number}
                        </td>

                        <td>{m.shipmentDate}</td>
                        <td
                            className={styles.clickableCell}
                            onClick={handleCellClick(m, 'Модель двигателя')}>{m.engine_data?.name}
                        </td>
                        <td>{m.engineID}</td>
                        <td
                            className={styles.clickableCell}
                            onClick={handleCellClick(m, 'Модель трансмиссии')}>{m.transmission_data?.name}
                        </td>
                        <td>{m.transmissionID}</td>
                        <td
                            className={styles.clickableCell}
                            onClick={handleCellClick(m, 'Модель ведущего моста')}>{m.drivingAxle_data?.name}
                        </td>
                        <td>{m.drivingAxleID}</td>
                        <td
                            className={styles.clickableCell}
                            onClick={handleCellClick(m, 'Модель управляемого моста')}>{m.controlledAxle_data?.name}
                        </td>
                        <td>{m.controlledAxleID}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal visible={showModal} onClose={() => setShowModal(false)}>
                {modalText}
            </Modal>
            <Tooltip
                  id="serial-tooltip"
                  place="top"
                  variant="custom"
                  className='custom-tooltip'
                  delayShow={100}
            />

        </div>
        </>


    )
}

export default MachineTable
