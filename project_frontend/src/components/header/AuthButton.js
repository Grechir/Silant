import React from "react";
import {useNavigate} from "react-router-dom";
import styles from './AuthButton.module.css'

const AuthButton = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
        window.location.reload();
    }

    return isAuthenticated ? (
        <div onClick={handleLogout} className={styles.authButton}>Выйти</div>
    ) : (
        <div onClick={() => navigate('/login')} className={styles.authButton}>Авторизация</div>
    );
};

export default AuthButton;
