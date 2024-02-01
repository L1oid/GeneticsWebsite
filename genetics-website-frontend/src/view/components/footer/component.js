import React from 'react';

import './style.css';
import footer_info from "../../../state/footer_info";

function FooterComponent() {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="contacts-container">
                    <p className="contacts-title">
                        Контакты
                    </p>
                    <p className="contacts-content">
                        Адрес: {footer_info[0].address}
                        <br/>
                        Тел.: {footer_info[0].phone}
                        <br/>
                        E-mail: {footer_info[0].email}
                    </p>
                </div>
                <p className="copyright-content">
                    © {footer_info[0].copyright}
                </p>
            </div>
        </div>
    )
}

export default FooterComponent;