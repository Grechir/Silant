import React, {useEffect, useRef} from "react";
import styles from './Modal.module.css'

const Modal = ({visible, onClose, children}) => {

    // обработчик закрытия модального окна при нажатии на Esc
    useEffect(() => {
        if (!visible) return; // проверяем видимость внутри useEffect

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div className={styles.modalWrapper} onClick={onClose} >
            <div className={styles.modal} onClick={event => event.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal