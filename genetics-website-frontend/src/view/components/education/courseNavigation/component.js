import React from 'react';

import './style.css';
import {Link} from "react-router-dom";

function CourseNavigationComponent(props) {
    return (
        <div className="course-navigation">
            <p className="course-navigation-title">Навигация</p>
            <p className="course-navigation-item-title">
                <Link className="course-navigation-item-list-href"
                      to={"/education"}>Образовательные материалы
                </Link>
            </p>
            <p className="course-navigation-item-title"
               onClick={() => props.setItemListStatus(!props.itemListStatus)}>
                Общедоступные курсы
            </p>
            <div
                className={props.itemListStatus ? "course-navigation-item-list" : "course-navigation-item-list active"}>
                {props.courseList.map((course, courseIndex) => (
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
    )
}

export default CourseNavigationComponent;