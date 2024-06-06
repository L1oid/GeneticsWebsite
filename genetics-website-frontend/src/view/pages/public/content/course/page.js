import React, {useEffect} from 'react';

import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearCourse, setArticleNotFound} from "../../../../../state/slices/content/contentSlice";
import CourseContainerComponent from "../../../../components/content/courseContainer/component";
import {fetchCourse} from "../../../../../state/slices/content/asyncActions";

function CoursePage(props) {
    const {id} = useParams();

    const dispatch = useDispatch();
    const articleNotFound = useSelector(state => state.content.articleNotFound);

    useEffect(() => {
        dispatch(fetchCourse({ id: id }));
    }, [dispatch, id])


    useEffect(() => {
        if (articleNotFound) {
            dispatch(setArticleNotFound());
        }
    }, [articleNotFound, dispatch]);

    return articleNotFound ? (
        <Navigate to="/education" />
    ) : (
        <CourseContainerComponent/>
    )
}

export default CoursePage;