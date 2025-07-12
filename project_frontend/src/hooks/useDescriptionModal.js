import { useState, useCallback } from "react";

export const useDescriptionModal = (modalConfig) => {
    const [modalText, setModalText] = useState('');
    const [showModal, setShowModal] = useState(false);


    // прописываем функционал для handleCellClick
    const handleCellClick = useCallback((obj, fieldName) => () => {
        const key = modalConfig[fieldName];
        const description = key && obj[key]?.description // если есть ключ и заполненное свойство description, то:
            ? obj[key].description
            : 'Описание отсутствует';

        setModalText(description);
        setShowModal(true);
    }, [modalConfig]);

    return { modalText, showModal, handleCellClick, setShowModal }
}
