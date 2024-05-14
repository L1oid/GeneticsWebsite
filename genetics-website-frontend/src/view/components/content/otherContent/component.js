import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import parse from 'html-react-parser';

import './style.css';

import {fetchContent, fetchEvents} from "../../../../state/slices/content/asyncActions";
import {NEWS} from "../../../../state/consts/contentTypes";
import {formatDate} from "../../../../state/functions/formatDate";
import {clearNewsList} from "../../../../state/slices/content/contentSlice";
import LoadMoreButtonComponent from "../loadMoreButton/component";
import {convertDateTime} from "../../../../state/functions/formatEventDate";

function OtherContentComponent() {

    const navigate = useNavigate();
    const contentList = useSelector(state => state.content.newsList);
    const contentListLength = useSelector(state => state.content.newsListLength);
    const eventList = useSelector(state => state.content.eventList);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);

    useEffect(() => {
        dispatch(fetchContent({type: NEWS, page: page, pageSize: pageSize}));
    }, [page, dispatch, pageSize])

    useEffect(() => {
        dispatch(fetchEvents({amount: 5}));
    }, [dispatch])

    useEffect(() => {
        dispatch(clearNewsList());
    }, [dispatch]);

    useEffect(() => {
        if (contentList.length === contentListLength) {
            setIsLoadMoreDisabled(true)
        } else {
            setIsLoadMoreDisabled(false)
        }
    }, [contentList.length, contentListLength]);

    const handleNavigateClick = (href) => {
        navigate(href);
    };

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    return (
        <div className="page-container">
            <div className="other-content-container-row-1">
                <div className="other-content-column-1">
                    <h2 className="other-content-heading">Новости</h2>
                    {contentList.length === 0 || (contentList.length === 1 && contentList[0].id === null) ? (
                        <div className="other-content-content-empty">
                            На данный момент новости отсутствуют
                        </div>
                    ) : (
                        <div className="other-content-list">
                            {contentList.map((content, contentIndex) => (
                                <div className="other-content-item" key={contentIndex}>
                                    <div className="other-content-card"
                                         data-href={`/news/${content.id}`}
                                         onClick={(e) => handleNavigateClick(e.currentTarget.getAttribute('data-href'))}>
                                        <div className="other-content-card-date">
                                            {formatDate(content.createdAt)}
                                        </div>
                                        <div className="other-content-card-title">
                                            {content.title}
                                        </div>
                                        <img className="other-content-card-image"
                                             src={content.previewImage}
                                             alt={"content_image_" + contentIndex}
                                        />
                                        <div className="other-content-card-content">
                                            {parse(content.shortDesc)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="other-content-container-row-3">
                    <LoadMoreButtonComponent handle={handleLoadMore} />
                </div>
                <div className="other-content-column-2">
                    <h2 className="other-content-heading">События</h2>
                    {eventList.length > 0 ? (
                        <div className="other-content-events-list">
                            {eventList.map((event, eventIndex) => (
                                <div className="event-item" key={eventIndex}>
                                    <div className="event-card">
                                        <div className="event-card-title">
                                            {eventList[eventIndex].title}
                                        </div>
                                        <div className="event-card-date">
                                            {parse(convertDateTime(eventList[eventIndex].scheduledFor))}
                                        </div>
                                        <div className="event-card-content">
                                            {parse(eventList[eventIndex].description)}
                                        </div>
                                        <div className="event-card-rendezvous">
                                            {eventList[eventIndex].rendezvous}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="other-content-content-empty">
                            На данный момент ближайшие события отсутствуют
                        </div>
                    )}
                </div>
            </div>
            <div className="other-content-container-row-2">
                <LoadMoreButtonComponent
                    handle={handleLoadMore}
                    isDisabled={isLoadMoreDisabled} />
            </div>
        </div>
    )
}

export default OtherContentComponent;