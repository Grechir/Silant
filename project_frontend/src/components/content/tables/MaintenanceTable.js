import React, {useEffect, useState} from "react";
import styles from "../../../styles/TableStyles.module.css"

// импорты для фильтров
import FilterHeaderCell from "../FilterHeaderCell";
import FilterResetBtn from "../FilterResetBtn";
import {maintenanceFilterConfig} from "../../../configs/filterConfig/maintenanceFilterConfig";
import {useFilteredData} from "../../../hooks/useFilteredData";

// импорты для редактирования данных
import EditableTableBody from "./editableTableParts/EditableTableBody";
import {useDirectoryOptions} from "../../../hooks/useDirectoryOptions";
import {useInlineEditing} from "../../../hooks/useInlineEditing";
import {useProfile} from "../../../hooks/useProfile";
import {maintenanceFieldsConfig} from "../../../configs/columnsConfig/maintenanceFieldsConfig";


const MaintenanceTable = ( {maintenance, disableMachineFilter} ) => {

    // редактирование данных
    const [maintenanceData, setMaintenanceData] = useState(maintenance);

    useEffect(() => {
        setMaintenanceData(maintenance);
    }, [maintenance]);

    const optionsMap = useDirectoryOptions()
    const profile = useProfile()
    const {
          editCell,
          editValue,
          setEditValue,
          startEditing,
          saveEdit,
          cancelEditing,
    } = useInlineEditing({
        role: profile?.role || 'anonymous',
        tableName: 'maintenance',
        setData: setMaintenanceData,
    })

    // фильтры
    const {
        filters,
        filteredData,
        selectedFilters,
        onFilterChange,
        resetFilters,
    } = useFilteredData(maintenanceData, maintenanceFilterConfig)

    // обертка на saveEdit
    const handleSaveEdit = (customValue = null) => {
        if (!editCell) return;

        const column = maintenanceFieldsConfig.find(col => col.key === editCell.field);
        const label = column?.label || '';

        saveEdit(customValue, label, optionsMap);
    };


    return (
        <>
        <FilterResetBtn resetFilters={resetFilters} selectedFilters={selectedFilters} />
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        {!disableMachineFilter
                            ? (
                                <FilterHeaderCell
                                    label="Зав. № машины"
                                    filterKey="machine"
                                    values={filters.machine || []}
                                    selectedValue={selectedFilters.machine}
                                    onChange={onFilterChange}
                                />
                            )
                            : <th>Зав. № машины</th>  // просто текст заголовка без фильтра
                        }
                        <FilterHeaderCell
                            label='Вид ТО'
                            filterKey='maintenanceType'
                            values={filters.maintenanceType || []}
                            selectedValue={selectedFilters.maintenanceType}
                            onChange={onFilterChange}
                        />
                        <th>Дата проведения ТО</th>
                        <th>Наработка, м/час</th>
                        <th>№ заказ-наряда</th>
                        <th>Дата заказ-наряда</th>
                        <th>Организация, проводившая ТО</th>
                        <FilterHeaderCell
                            label='Сервисная компания'
                            filterKey='serviceCompany'
                            values={filters.serviceCompany || []}
                            selectedValue={selectedFilters.serviceCompany}
                            onChange={onFilterChange}
                        />
                    </tr>
                    </thead>
                    <EditableTableBody
                        data={filteredData}
                        columns={maintenanceFieldsConfig}
                        editCell={editCell}
                        editValue={editValue}
                        optionsMap={optionsMap}
                        setEditValue={setEditValue}
                        startEditing={startEditing}
                        saveEdit={handleSaveEdit}
                        cancelEditing={cancelEditing}
                    />
                </table>
            </div>
            </>

            )
            }

            export default MaintenanceTable
