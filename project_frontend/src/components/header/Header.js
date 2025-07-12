import React from "react";
import header from './Header.module.css'
import logoRed from '../../assets/images/logo_red.png';
import {Link} from "react-router-dom";
import AuthButton from "./AuthButton"


const Header = () => {

    return (
        <div className={header.containerWrapper}>
            <div className={header.container}>
                <Link to='/'>
                    <img src={logoRed} alt='Логотип' className={header.logo}/>
                </Link>

                <div className={header.center}>
                    <div className={header.contact}>+7-8352-20-12-09, telegram</div>
                    <div className={header.title}>Электронная сервисная книжка "Мой Силант"</div>
                </div>

                <AuthButton/>

            </div>
        </div>
    );
}

export default Header