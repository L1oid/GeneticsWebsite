import React, {useState} from 'react';

import './style.css';
import {Link} from "react-router-dom";

function CoursesNavigationComponent(props) {

    const [freeCourseMenuStatus, setFreeCourseMenuStatus] = useState(false);

    return (
        <div className="courses-menu">
            <div className="courses-menu-title">
                <span className="material-symbols-outlined account-icon">bottom_navigation</span>
                Навигация
            </div>
            <p className="courses-menu-item-title" onClick={() => setFreeCourseMenuStatus(!freeCourseMenuStatus)}>
                Общедоступные курсы
            </p>
            <div className={freeCourseMenuStatus ? "courses-menu-item-list" : "courses-menu-item-list active"}>
                <p className="courses-menu-item-list-title">
                    <Link className="courses-menu-item-list-href"
                          to={"/education/"}>Лул
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default CoursesNavigationComponent;