import { useMemo, useState } from "react";

// массив объектов - data: [machine1, machine2]
// массив конфигураций - config: [{ key: "engine", path: ["engine_data", "name"]}, ... ],
export const useFilteredData = (data, config) => {

    // достает уникальные объекты из массива, убирая лишнее
    const getUnique = (array) =>
        [...new Set(array.filter((value) =>
            value !== undefined &&
            value !== null &&
            value !== ""))
        ];

    // определение возможных значений для каждого фильтра - возвращает { 'engine': ['engine_1', 'engine_2'], ...}
    const filters = useMemo(() => {
        const result = {};

        // перебираем все элементы конфигурации фильтров
        config.forEach(filterConfig => {
            const key = filterConfig.key   // 'engine'
            const path = filterConfig.path  // ['engine_data', 'name']

            const allValues = data.map(obj => {
                let value = obj // сначала это целый объект (к примеру, машина)
                // идем вглубь объекта (что-то вроде reduce, но нагляднее)
                for (const step of path) {
                    if (!value) break;
                    value = value[step];
                }
                return value
            });

            result[key] = getUnique(allValues)

        })

        return result
    }, [data, config])

    // хранилище фильтров
    const [selectedFilters, setSelectedFilters] = useState({});

    // обновляет значение фильтра
    const onFilterChange = (key, value) => {
        setSelectedFilters((prev) => ({ ...prev, [key]: value }))
    };

    // возвращает массив, отфильтрованный по выбранным фильтрам
    const filteredData = useMemo(() => {
        if (Object.keys(selectedFilters).length === 0) return data;

        return data.filter(obj => {
            return Object.entries(selectedFilters).every(([key, selectedValue]) => {
                // Если фильтр не выбран - пропускаем
                if (!selectedValue) return true;

                // Находим конфигурацию для текущего фильтра
                const filterConfig = config.find(c => c.key === key);
                if (!filterConfig) return true;

                // Получаем значение из объекта данных
                let itemValue = obj;
                for (const step of filterConfig.path) {
                    if (!itemValue) break;
                    itemValue = itemValue[step];
                }

                // Сравниваем с выбранным значением
                return itemValue === selectedValue;
            });
        });
    }, [data, selectedFilters, config])

    // сброс фильтров
    const resetFilters = () => {
        setSelectedFilters({});
    };

    return {
        filters,   // уникальные значения по каждому фильтру
        filteredData,  // данные после фильтрации
        selectedFilters, // выбранные пользователем фильтры
        onFilterChange,  // обработчик изменения фильтра
        resetFilters, // сброс фильтра
    };

}



