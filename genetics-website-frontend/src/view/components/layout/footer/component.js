import React from 'react';

import './style.css';
import {useSelector} from "react-redux";

function FooterComponent() {

    const footerInfo = useSelector(state => state.layout.footerInfo);

    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="contacts-container">
                    <p className="contacts-title">
                        Контакты
                    </p>
                    <p className="contacts-content">
                        Адрес: {footerInfo.address}
                        <br/>
                        Тел.: {footerInfo.phone}
                        <br/>
                        E-mail: {footerInfo.email}
                    </p>
                </div>
                <p className="copyright-content">
                    © {footerInfo.copyright}
                </p>
            </div>
        </div>
    )
}

export default FooterComponent;