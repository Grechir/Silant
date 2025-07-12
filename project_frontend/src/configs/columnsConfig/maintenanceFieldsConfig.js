export const maintenanceFieldsConfig = [
    {
        // НЕ редактируется
        key: 'machine_data.serial_number',
        label: 'Зав. № машины',
        editable: false,
    },
    {
        // select поле
        key: 'maintenanceType',
        label: 'Вид ТО',
        type: 'select',
        editable: true,
    },
    {
        // input поле
        key: 'maintenanceDate',
        label: 'Дата проведения ТО',
        editable: true,
    },
    {
        // input поле
        key: 'operating',
        label: 'Наработка, м/час',
        editable: true,
    },
    {
        // input поле
        key: 'orderID',
        label: '№ заказ-наряда',
        editable: true,
    },
    {
        // input поле
        key: 'orderDate',
        label: 'Дата заказ-наряда',
        editable: true,
    },
    {
        // select поле
        key: 'maintenance_org',
        label: 'Организация, проводившая ТО',
        type: 'select',
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

