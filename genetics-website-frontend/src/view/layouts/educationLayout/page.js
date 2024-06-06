import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";

import "./style.css"

import BreadcrumpComponent from "../../components/common/breadcrump/component";
import CoursesNavigationComponent from "../../components/content/coursesNavigation/component";
import {useDispatch, useSelector} from "react-redux";
import {fetchCourses} from "../../../state/slices/content/asyncActions";
import {STUDENT, TEACHER} from "../../../state/consts/roles";
import {clearCloseCoursesList, clearFreeCoursesList} from "../../../state/slices/content/contentSlice";

function EducationLayout() {

    const dispatch = useDispatch();
    const {roles} = useSelector(state => state.user)
    const isStudent = roles.includes(STUDENT) || roles.includes(TEACHER);

    useEffect(() => {
        dispatch(clearFreeCoursesList())
        dispatch(fetchCourses({courseProtection: false, orderByTitleAuthor: "titleAsc"}));
    }, [dispatch])

    useEffect(() => {
        if (isStudent) {
            dispatch(clearCloseCoursesList())
            dispatch(fetchCourses({courseProtection: true, orderByTitleAuthor: "titleAsc"}));
        }
    }, [dispatch, isStudent])

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