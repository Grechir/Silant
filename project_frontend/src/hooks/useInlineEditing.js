import {useState} from "react";
import {fetchWithToken} from "../utils/login/api";

// проверка прав пользователя
const canEdit = (role, tableName) => {
    if (role === 'manager') return true;
    if (role === 'service' && (tableName === 'maintenance' || tableName === 'complaint')) return true;
    return role === 'client' && (tableName === 'maintenance'); // если ни одно из условий, тогда - false

};

// основная функция редактирования
export const useInlineEditing = ({role, tableName, setData}) => {
    const [editCell, setEditCell] = useState(null); // {id, field, type}
    const [editValue, setEditValue] = useState('');

    // начало редактирования ячейки
    const startEditing = (itemId, field, currentValue, columnConfig) => {
        if (!canEdit(role, tableName)) return false;
        if (columnConfig && !columnConfig.editable) return false;
        setEditCell({id: itemId, field, type: columnConfig?.type || 'input'});
        setEditValue(currentValue ?? ''); // проверка на null и undefined
    };

    // сохранение отредактированной ячейки
    const saveEdit = async (customValue = null, label = '', optionsMap = {}) => {
        if (!editCell) return;
        const {id, field} = editCell
        const valueToSave = customValue ?? editValue

        try {
            console.log('Saving field', field, 'with value', valueToSave);
            console.log('PATCH Body:', JSON.stringify({ [field]: valueToSave }));
            await fetchWithToken(`http://127.0.0.1:8000/api/${tableName}/${id}/`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({[field]: valueToSave})
            });
            cancelEditing();

            if (['select'].includes(editCell.type)) {
                const relatedKey = `${field}_data`;
                console.log('optionsMap keys:', Object.keys(optionsMap), 'label:', label);
                const optionList = optionsMap[label] || [];

                const matched = optionList.find(opt => {
                  if (field === 'serviceCompany' || field === 'client') {
                    return String(opt.user) === String(valueToSave);
                  }
                  return String(opt.id) === String(valueToSave);
                });

                if (matched) {
                    setData(prev =>
                        Array.isArray(prev)
                            ? prev.map(item => item.id === id
                                ? { ...item, [field]: valueToSave, [relatedKey]: matched }
                                : item
                            )
                            : { ...prev, [field]: valueToSave, [relatedKey]: matched }
                    );
                    return;
                }
            }

            // моментальное изменение состояния компоненты (сразу показывает измененные данные)
            setData(prev => {
                const updated = Array.isArray(prev)
                    ? prev.map(item => item.id === id ? { ...item, [field]: valueToSave } : item)
                    : { ...prev, [field]: valueToSave };
                const relatedDataKey = `${field}_data`;
                const allOptions = optionsMap[label] || [];

                const matched = allOptions.find(opt => {
                      if (field === 'serviceCompany' || field === 'client') {
                        return String(opt.user) === String(valueToSave);
                      }
                      return String(opt.id) === String(valueToSave);
                });

                if (matched) {
                    if (Array.isArray(updated)) {
                        return updated.map(item =>
                            item.id === id ? { ...item, [relatedDataKey]: matched } : item
                        );
                    } else {
                        return {
                            ...updated,
                            [relatedDataKey]: matched,
                        };
                    }
                }

                return updated;
                });


        } catch (error) {
            console.error('Ошибка при сохранении', error);
            cancelEditing();
        }
    }

    // отмена редактирования ячейки
    const cancelEditing = () => {
        setEditCell(null);
        setEditValue("");
    }


    return {
        editCell, // объект с информацией о редактируемой ячейке {id, filed}
        editValue, // текущее редактируемое значение
        setEditValue, // функция: обновляет editValue
        startEditing, // функция: начинает редактирование ячейки
        saveEdit, // функция: сохраняет результат редактирования
        cancelEditing, // функция: отменяет редактирование
    };

};
