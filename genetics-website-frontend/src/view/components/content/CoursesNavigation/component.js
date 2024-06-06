import React, {useEffect, useState} from 'react';

import './style.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {STUDENT, TEACHER} from "../../../../state/consts/roles";

function CoursesNavigationComponent(props) {

    const [freeCourseMenuStatus, setFreeCourseMenuStatus] = useState(false);
    const [privateCourseMenuStatus, setPrivateCourseMenuStatus] = useState(false);

    const freeCoursesList = useSelector(state => state.content.freeCoursesList);
    const closeCoursesList = useSelector(state => state.content.closeCoursesList);

    useEffect(() => {
        console.log(freeCoursesList)
    }, [freeCoursesList])

    const {roles} = useSelector(state => state.user)
    const isStudent = roles.includes(STUDENT) || roles.includes(TEACHER);

    return (
        <div className="courses-menu">
            <div className="courses-menu-title">
                <span className="material-symbols-outlined account-icon">bottom_navigation</span>
                Материалы
            </div>
            <div className="courses-menu-body">
                {freeCourseMenuStatus &&
                    <p className="courses-menu-item-title"
                       onClick={() => setFreeCourseMenuStatus(!freeCourseMenuStatus)}>
                        Общедоступные
                        <span className="material-symbols-outlined">keyboard_arrow_down</span>
                    </p>
                }
                {!freeCourseMenuStatus &&
                    <p className="courses-menu-item-title"
                       onClick={() => setFreeCourseMenuStatus(!freeCourseMenuStatus)}>
                        Общедоступные
                        <span className="material-symbols-outlined">keyboard_arrow_up</span>
                    </p>
                }
                <div className={freeCourseMenuStatus ? "courses-menu-item-list" : "courses-menu-item-list active"}>
                    {freeCoursesList.map((course, courseIndex) => (
                        <p className="courses-menu-item-list-title" key={courseIndex}>
                            <Link className="courses-menu-item-list-href"
                                  to={"/education/" + course.id}>{course.title}
                            </Link>
                        </p>
                    ))}
                </div>
                {isStudent === true && privateCourseMenuStatus &&
                    <p className="courses-menu-item-title"
                       onClick={() => setPrivateCourseMenuStatus(!privateCourseMenuStatus)}>
                        Для студентов
                        <span className="material-symbols-outlined">keyboard_arrow_down</span>
                    </p>
                }
                {isStudent === true && !privateCourseMenuStatus &&
                    <p className="courses-menu-item-title"
                       onClick={() => setPrivateCourseMenuStatus(!privateCourseMenuStatus)}>
                        Для студентов
                        <span className="material-symbols-outlined">keyboard_arrow_up</span>
                    </p>
                }
                {isStudent === false &&
                    <p className="courses-menu-item-title for-student-lock">
                        Для студентов
                        <span className="material-symbols-outlined">lock</span>
                    </p>
                }
                {isStudent === true && (
                    <div
                        className={privateCourseMenuStatus ? "courses-menu-item-list" : "courses-menu-item-list active"}>
                        {closeCoursesList.map((closeCourse, closeCourseIndex) => (
                            <p className="courses-menu-item-list-title" key={closeCourseIndex}>
                                <Link className="courses-menu-item-list-href"
                                      to={"/education/" + closeCourse.id}>{closeCourse.title}
                                </Link>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoursesNavigationComponent;