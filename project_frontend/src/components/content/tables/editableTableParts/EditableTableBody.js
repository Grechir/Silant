import React, {useRef} from "react";

import {getLabel, getNestedValue, selectOnChange} from "../../../../utils/handle/handleSelect";
import {useClickOutside} from "../../../../hooks/useClickOutside";

const EditableTableBody = ({
        data, // данные объектов
        columns, // колонки в ряду
        editCell, // объект с информацией о редактируемой ячейке {id, filed}
        editValue, // текущее редактируемое значение
        optionsMap, // объект, содержащий загруженные опции для select-колонок. Ключ — column.entityKey, значение — массив опций [{id, name}, ...]
        setEditValue, // функция: обновляет editValue
        startEditing, // функция: начинает редактирование ячейки
        saveEdit, // функция: сохраняет результат редактирования
        cancelEditing, // функция: отменяет редактирование
    }) => {

    // клик вне поля закрывает его редактирование
    const editCellRef = useRef(null);
    useClickOutside(editCellRef, cancelEditing, !!editCell);

    return (
        <tbody>
        {/* по каждому объекту создаем ряд */}
        {data.map((item) => (

            <tr key={item.id}>
                {/* по каждой колонке в ряду (то есть по каждой ячейке)*/}
                {columns.map((column) => {
                    {/* {key: "machine_data.serial_number"} так как у нас есть вложенность, мы разбиваем значение */}
                    const keyParts = column.key.split('.');
                    let value = item;
                    {/* Мы получаем что-то вроде item[machine_data][serial_number] */}
                    for (const part of keyParts) {
                        value = value
                            ? value[part]
                            : undefined;
                    }

                    // таким образом можно применить форматирование при помощи render, если не нужно, берем просто значение
                    // полезно для дат, цен, вложенных объектов и т.д.
                    const displayValue = column.render
                        ? column.render(item)
                        : value;

                    // редактируется ли ячейка
                    const isEditing = editCell?.id === item.id && editCell.field === column.key;

                    return (
                        <td key={column.key}
                            onClick={() => {
                                // если ячейка изменяемая - начинаем редактирование
                                if (column.editable) {
                                    startEditing(item.id, column.key, value, column)
                                }
                            }}
                            style={{cursor: column.editable ? 'pointer' : 'default'}}
                        >

                            {/* Проверка на режим редактирования */}
                            {isEditing ? (

                                // проверка на select и input
                                column.type === 'select' ? (
                                    <select
                                        ref={editCellRef}
                                        value={editValue}
                                        autoFocus
                                        onChange={selectOnChange(
                                            column.key,
                                            optionsMap,
                                            column.label,
                                            setEditValue,
                                            saveEdit
                                        )}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') saveEdit();
                                            if (event.key === 'Escape') cancelEditing();
                                        }}
                                    >
                                        <option value=''>не выбрано</option>
                                        {(optionsMap[column.label] || []).map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        ref={editCellRef}
                                        value={editValue}
                                        autoFocus
                                        onChange={(event) => setEditValue(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') saveEdit();
                                            if (event.key === 'Escape') cancelEditing();
                                        }}
                                    />
                                )

                            ) : (
                                column.type === 'select'
                                    ? (
                                        column.valueField
                                            ? getNestedValue(item, column.valueField)
                                            : getLabel(value, optionsMap[column.label] || [])
                                    )
                                    : String(displayValue ?? '-')
                            )}
                        </td>
                    )
                })}
            </tr>

        ))}
        </tbody>
    )
}

export default EditableTableBody