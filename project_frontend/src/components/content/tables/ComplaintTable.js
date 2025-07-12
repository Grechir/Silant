import React, {useEffect, useState} from "react";
import styles from "../../../styles/TableStyles.module.css"

// импорты для фильтров
import FilterHeaderCell from "../FilterHeaderCell";
import FilterResetBtn from "../FilterResetBtn";
import {complaintFilterConfig} from "../../../configs/filterConfig/complaintFilterConfig";
import {useFilteredData} from "../../../hooks/useFilteredData";

// импорты для редактирования данных
import EditableTableBody from "./editableTableParts/EditableTableBody";
import {useDirectoryOptions} from "../../../hooks/useDirectoryOptions";
import {useInlineEditing} from "../../../hooks/useInlineEditing";
import {useProfile} from "../../../hooks/useProfile";
import {complaintFieldsConfig} from "../../../configs/columnsConfig/complaintFieldsConfig";
import {maintenanceFieldsConfig} from "../../../configs/columnsConfig/maintenanceFieldsConfig";

const ComplaintTable = ( {complaint} ) => {

    // редактирование данных
    const [complaintData, setComplaintData] = useState(complaint);

    useEffect(() => {
        setComplaintData(complaint);
    }, [complaint]);

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
        tableName: 'complaint',
        setData: setComplaintData,
    })


    // фильтры
    const {
        filters,
        filteredData,
        selectedFilters,
        onFilterChange,
        resetFilters,
    } = useFilteredData(complaintData, complaintFilterConfig)

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
                    <th>Зав. № машины</th>
                    <th>Дата отказа</th>
                    <th>Наработка, м/час</th>
                    <FilterHeaderCell
                        label='Узел отказа'
                        filterKey='breakdownNode'
                        values={filters.breakdownNode || []}
                        selectedValue={selectedFilters.breakdownNode}
                        onChange={onFilterChange}
                    />
                    <th>Описание отказа</th>
                    <FilterHeaderCell
                        label='Способ восстановления'
                        filterKey='recoveryMethod'
                        values={filters.recoveryMethod || []}
                        selectedValue={selectedFilters.recoveryMethod}
                        onChange={onFilterChange}
                    />
                    <th>Используемые запасные части</th>
                    <th>Дата восстановления</th>
                    <th>Время простоя техники</th>
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
                    columns={complaintFieldsConfig}
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

export default ComplaintTable