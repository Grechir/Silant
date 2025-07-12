import React, {useEffect, useRef, useState} from "react";
import styles from './MachineMenu.module.css'

import {getLabel, getNestedValue} from "../../utils/handle/handleSelect";
import { machineFieldsConfig } from "../../configs/columnsConfig/machineFieldsConfig";
import EditableField from "./tables/editableTableParts/EditableField";

// импорт пользовательских хуков
import { useDirectoryOptions } from "../../hooks/useDirectoryOptions";
import { useInlineEditing } from "../../hooks/useInlineEditing";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useProfile } from "../../hooks/useProfile";


const MachineMenu = ({ machine }) => {

    // редактирование данных
    const [machineState, setMachineState] = useState(machine);

    useEffect(() => {
        setMachineState(machine);
    }, [machine]);

    const optionsMap = useDirectoryOptions();
    const profile = useProfile();
    const {
        editCell,
        editValue,
        setEditValue,
        startEditing,
        saveEdit,
        cancelEditing,
    } = useInlineEditing({
        role: profile?.role || "anonymous",
        tableName: "machine",
        setData: setMachineState
    });

    // клик вне поля закрывает его редактирование
    const editCellRef = useRef(null);
    useClickOutside(editCellRef, cancelEditing, !!editCell);

    // обработка клика
    const handleClick = (item, value) => {
    if (!item.editable) return;
        const initialValue = item.type === 'select' ? value?.id : value;
        startEditing(machineState.id, item.key, initialValue, item);
    };

    // вывод значения
    const renderDisplayValue = (item, value) => {
        if (item.type === 'select') {
            return item.valueField
                ? getNestedValue(machineState, item.valueField)
                : getLabel(value?.id ?? value, optionsMap[item.label] || []);
        }
        return String(value ?? '-');
    };

    return (
        <div className={styles.menuWrapper}>
            <div className={styles.menuContainer}>
                {machineFieldsConfig.map((group, index) => (
                    <div key={index} className={styles.dataGroup}>
                        <h3 className={styles.groupTitle}>{group.title}</h3>
                        <div className={styles.dataGrid}>
                            {group.items.map((item) => {
                                const value = getNestedValue(machineState, item.key);
                                const isEditing = editCell?.id === machineState.id && editCell.field === item.key;

                                return (
                                    <div
                                        key={item.key}
                                        className={styles.dataItem}
                                        onClick={() => handleClick(item, value)}
                                        style={{ cursor: item.editable ? 'pointer' : 'default' }}
                                    >
                                        <span className={styles.dataLabel}>{item.label}:</span>
                                        <span className={styles.dataValue}>
                                            {isEditing ? (
                                                <EditableField
                                                    item={item}
                                                    editValue={editValue}
                                                    editCellRef={editCellRef}
                                                    optionsMap={optionsMap}
                                                    setEditValue={setEditValue}
                                                    saveEdit={saveEdit}
                                                    cancelEditing={cancelEditing}
                                                />
                                            ) : (
                                                renderDisplayValue(item, value)
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MachineMenu;

