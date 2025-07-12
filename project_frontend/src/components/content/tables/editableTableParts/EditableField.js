import React from "react";
import { selectOnChange } from "../../../../utils/handle/handleSelect";

const EditableField = ({
    item,
    editValue,
    editCellRef,
    optionsMap,
    setEditValue,
    saveEdit,
    cancelEditing
}) => {
    if (item.type === 'select') {
        return (
            <select
                ref={editCellRef}
                value={editValue}
                autoFocus
                onChange={selectOnChange(
                    item.key,
                    optionsMap,
                    item.label,
                    setEditValue,
                    (val) => {
                        console.log('EditableField saveEdit called with:', { val, label: item.label });
                        saveEdit(val, item.label, optionsMap)
                    }
                )}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(undefined, item.label, optionsMap);
                    if (e.key === 'Escape') cancelEditing();
                }}
            >
                <option value=''>не выбрано</option>
                {(optionsMap[item.label] || []).map(opt => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <input
            ref={editCellRef}
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit();
                if (e.key === 'Escape') cancelEditing();
            }}
        />
    );
};

export default EditableField;
