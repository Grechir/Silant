export const machineFieldsConfig = [
  {
    title: "Основные характеристики",
    items: [
      {
        label: "Модель машины",
        key: "model_data",
        type: "select",
        editable: true,
      },
      {
        label: "Заводской номер",
        key: "serial_number",
        editable: true,
      },
      {
        label: "Дата отгрузки",
        key: "shipmentDate",
        editable: true,
      }
    ]
  },
  {
    title: "Двигатель",
    items: [
      {
        label: "Модель двигателя",
        key: "engine",
        valueField: "engine_data.name",
        type: "select",
        editable: true,
      },
      {
        label: "Заводской номер",
        key: "engineID",
        editable: true,
      }
    ]
  },
  {
    title: "Трансмиссия",
    items: [
      {
        label: "Модель трансмиссии",
        key: "transmission",
        valueField: "transmission_data.name",
        type: "select",
        editable: true,
      },
      {
        label: "Заводской номер",
        key: "transmissionID",
        editable: true,
      }
    ]
  },
  {
    title: "Мосты",
    items: [
      {
        label: "Модель ведущего моста",
        key: "drivingAxle",
        valueField: "drivingAxle_data.name",
        type: "select",
        editable: true,
      },
      {
        label: "Заводской номер",
        key: "drivingAxleID",
        editable: true,
      },
      {
        label: "Модель управляемого моста",
        key: "controlledAxle",
        valueField: "controlledAxle_data.name",
        type: "select",
        editable: true,
      },
      {
        label: "Заводской номер",
        key: "controlledAxleID",
        editable: true,
      }
    ]
  },
  {
    title: "Дополнительная информация",
    items: [
      {
        label: "Сервисная компания",
        key: "serviceCompany",
        type: "select",
        valueField: "serviceCompany_data.company_name",
        editable: true,
      },
      {
        label: "Клиент",
        key: "client",
        type: "select",
        valueField: "client_data.company_name",
        editable: true,
      },
      {
        label: "Грузополучатель",
        key: "recipient",
        editable: true,
      },
      {
        label: "Договор поставки",
        key: "deliveryContract",
        editable: true,
      },
      {
        label: "Адрес поставки",
        key: "deliveryAddress",
        editable: true,
      },
      {
        label: "Комплектация",
        key: "equipment",
        editable: true,
      }
    ]
  }
];
