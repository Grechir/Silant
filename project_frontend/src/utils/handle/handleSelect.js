/**
 * Сравнивает переданный id с id объектов из массива объектов. При совпадении возвращает отображаемое имя по id.
 * @param {number|string} value - ID значения (например, 73).
 * @param {Array} options - Массив объектов с полями id и name.
 * @returns {string} Название (name) найденного объекта или '-' если не найден.
 */
export const getLabel = (value, options) => {
  const id = Number(value);
  const option = options.find(opt => opt.id === id);
  return option ? option.name : '-';
};

/**
 * Получает вложенное значение по строковому пути.
 * @param {object} obj - Объект, из которого нужно достать значение.
 * @param {string} path - Путь в виде строки (например, 'machine_data.serial_number').
 * @returns {*} Значение по указанному пути или '-' если путь некорректен.
 */
export const getNestedValue = (obj, path) => {
    if (!obj || !path) return '-';

    const keys = path.split('.');
    let result = obj;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
        // Если это последний ключ, попробуем альтернативы (костыль из-за разного ответа от backend)
        if (i === keys.length - 1 && typeof result === 'object') {
            if ('name' in result) return result.name;
            if ('company_name' in result) return result.company_name;
          }
          return '-';
        }
    }

  return result ?? '-';
};


// Зачем нужно это разделение?
// В случае, например, с полем serviceCompany — в объекте приходит не сам справочник, а связанный объект с другим id (например, id = 30).
// Но в options переданы объекты из справочника, где id = 73, 74, 75 — это разные сущности, связанные через PrimaryRelatedField.
// Поэтому отображение по id не сработает, и имя не найдётся.
// В других случаях (например, со справочниками напрямую) мы получаем объект уже из options,
// и id совпадают — отображение имени работает корректно.

/**
 * Утилита для обработки выбора значения в select с учетом особенностей serviceCompany.
 * @param {string} fieldKey - ключ поля (например, 'serviceCompany', 'maintenance_org' и т.п.)
 * @param {object} optionsMap - объект с опциями для select
 * @param {string} label - ключ для optionsMap (column.label)
 * @param {(value: any) => void} setEditValue - функция для обновления локального значения редактирования
 * @param {(value: any) => void} saveEdit - функция для сохранения значения (например, отправка PATCH)
 * @returns {(event: React.ChangeEvent<HTMLSelectElement>) => void} - обработчик onChange для select
 */

export const selectOnChange = (fieldKey, optionsMap, label, setEditValue, saveEdit) => {
        return (event) => {
            const selectedId = Number(event.target.value);
            console.log('selectedId:', selectedId);

            if (fieldKey === 'serviceCompany' || fieldKey === 'client') {
                const directoryObject = (optionsMap[label] || []).find((option) => option.id === selectedId)
                if (!directoryObject) {
                    console.error('Не найден выбранный объект справочника')
                }
                if (!directoryObject.user) {
                  console.error('У выбранного объекта справочника нет связанного пользователя');
                  return;
                }
                const userId = directoryObject.user
                console.log('Сохранение id пользователя:', userId)
                setEditValue(userId)  // не обязательно, но на всякий случай добавил
                saveEdit(userId)
            } else {
                setEditValue(selectedId)
                saveEdit(selectedId)
            }
        }
}