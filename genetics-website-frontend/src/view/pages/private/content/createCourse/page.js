import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {TEACHER} from "../../../../../state/consts/roles";
import CreateCourseContainerComponent from "../../../../components/content/createCourseContainer/component";

function CreateCoursePage(props) {
    const {roles} = useSelector(state => state.user)
    const isTeacher = roles.includes(TEACHER);

    return isTeacher ? (
        <CreateCourseContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default CreateCoursePage;