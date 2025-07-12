import React, { useState } from "react";
import {loginUser} from "../../utils/login/api";
import {useNavigate} from "react-router-dom";
import styles from './LoginForm.module.css'

const LoginForm = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginUser({username, password});
            console.log('Успешная авторизация');
            navigate('/')
            window.location.reload();
        } catch (error) {
            setError(error.message)
        }
    };

    return(
        <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input className={styles.input}
                       type='text'
                       name='username'
                       value={username}
                       onChange={event => setUsername(event.target.value)}/>
                <input className={styles.input}
                       type='password'
                       name='password'
                       value={password}
                       onChange={event => setPassword(event.target.value)}/>
                <button className={styles.button}
                        type='submit'>Войти</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default LoginForm
