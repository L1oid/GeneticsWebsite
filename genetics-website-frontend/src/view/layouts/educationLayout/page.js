import React from 'react';
import {Outlet} from "react-router-dom";

import "./style.css"

import BreadcrumpComponent from "../../components/common/breadcrump/component";
import CoursesNavigationComponent from "../../components/content/CoursesNavigation/component";

function EducationLayout() {

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/education",
            name: "Образование"
        }
    ]

    return  (
        <div className="page-container">
            <div className="education">
                <BreadcrumpComponent ways = {ways} />
                <div className="education-container">
                    <div className="education-container-row-1">
                        <p className="education-container-heading">Образование</p>
                    </div>
                    <div className="education-container-row-2">
                        <div className="education-container-column-1">
                            <CoursesNavigationComponent />
                        </div>
                        <div className="education-container-column-2">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EducationLayout;