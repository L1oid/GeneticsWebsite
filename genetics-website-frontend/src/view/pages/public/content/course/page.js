import React, {useEffect} from 'react';

import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setArticleNotFound} from "../../../../../state/slices/content/contentSlice";
import CourseContainerComponent from "../../../../components/content/courseContainer/component";

function CoursePage(props) {
    const {id} = useParams();

    const dispatch = useDispatch();
    const course = useSelector(state => state.content.course);
    const articleNotFound = useSelector(state => state.content.articleNotFound);


    useEffect(() => {
        if (articleNotFound) {
            dispatch(setArticleNotFound());
        }
    }, [articleNotFound, dispatch]);

    return articleNotFound ? (
        <Navigate to="/course-no-access" />
    ) : (
        <CourseContainerComponent
            course={course}
        />
    )
}

export default CoursePage;