import React, {useState} from 'react';

import course_list from "../../../../data/course_list";
import ed_materials_list from "../../../../data/ed_materials_list";
import './style.css';

import BreadcrumpComponent from "../../common/breadcrump/component";
import {Link} from "react-router-dom";

function CourseComponent() {

    const [itemListStatus, setItemListStatus] = useState(false);

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

    return (
        <div className="page-container">
            <div className="course-container">
                <BreadcrumpComponent ways={ways}/>
                <p className="course-heading">Образование</p>
                <div className="column-course-container">
                    <div className="course-column-1">
                        <div className="course-navigation">
                            <p className="course-navigation-title">Навигация</p>
                            <p className="course-navigation-item-title">
                                <Link className="course-navigation-item-list-href"
                                      to={"/education"}>Образовательные материалы
                                </Link>
                            </p>
                            <p className="course-navigation-item-title"
                               onClick={() => setItemListStatus(!itemListStatus)}>
                                Общедоступные курсы
                            </p>
                            <div
                                className={itemListStatus ? "course-navigation-item-list" : "course-navigation-item-list active"}>
                                {course_list.map((course, courseIndex) => (
                                    course.private === false && (
                                        <p className="course-navigation-item-list-title">
                                            <Link className="course-navigation-item-list-href"
                                                  to={"/education/" + course.id}>{course.title}</Link>
                                        </p>
                                    )
                                ))}
                            </div>
                            <div className="course-navigation-item-title">Мои курсы</div>
                        </div>
                    </div>
                    <div className="course-column-2">
                        <div className="course-content-container">
                            <p className="course-content-title">Образовательные материалы</p>
                            {ed_materials_list.map((material, materialIndex) => (
                                <div className="course-content-item">
                                    <span className="material-symbols-outlined icon">picture_as_pdf</span>
                                    <a href={material.url} className="course-content-item-name">{material.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseComponent;