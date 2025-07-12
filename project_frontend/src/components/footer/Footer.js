import React from "react";
import footer from './Footer.module.css'

const Footer = () => {
    return (
        <div className={footer.containerWrapper}>
            <div className={footer.container}>
                <div className={footer.content}>+7-8352-20-12-09, telegram</div>
                <div className={footer.content}>Мой силант 2025</div>
            </div>
        </div>
    );
}

export default Footer