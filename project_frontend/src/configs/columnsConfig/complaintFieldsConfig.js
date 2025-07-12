export const complaintFieldsConfig = [
    {
        // НЕ редактируется
        key: 'machine_data.serial_number',
        label: 'Зав. № машины',
        editable: false,
    },
    {
        // input поле
        key: 'breakdownDate',
        label: 'Дата отказа (поломки)',
        editable: true,
    },
    {
        // input поле
        key: 'operating',
        label: 'Наработка, м/час',
        editable: true,
    },
    {
        // select поле
        key: 'breakdownNode',
        label: 'Узел поломки',
        type: 'select',
        editable: true,
    },
    {
        // input поле
        key: 'breakdownDescription',
        label: 'Описание поломки',
        editable: true,
    },
    {
        // select поле
        key: 'recoveryMethod',
        label: 'Способ восстановления',
        type: 'select',
        editable: true,
    },
    {
        // input поле
        key: 'spareParts',
        label: 'Используемые запасные части',
        editable: true,
    },
    {
        // input поле
        key: 'recoveryDate',
        label: 'Дата восстановления',
        editable: true,
    },
    {
        // input поле
        key: 'downtime',
        label: 'Время простоя техники',
        editable: true,
    },
    {
        // select поле
        key: 'serviceCompany',
        label: 'Сервисная компания',
        type: 'select',
        valueField: 'serviceCompany_data.company_name',
        editable: true,
    },
]