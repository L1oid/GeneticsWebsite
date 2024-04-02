import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import './style.css';

import {clearNews} from "../../../../state/slices/content/contentSlice";
import BreadcrumpComponent from "../../common/breadcrump/component";
import {fetchNews} from "../../../../state/slices/content/asyncActions";

function ListNewsComponent() {
    const news_list = useSelector(state => state.content.news_list);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNews());
        return () => {
            dispatch(clearNews());
        };
    }, [dispatch])

    const handleNavigateClick = (href) => {
        navigate(href);
    };

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/news",
            name: "Новости"
        }
    ]

    return (
        <div className="page-container">
            <div className="list-news-container">
                <BreadcrumpComponent ways={ways}/>
                <h2 className="list-news-heading">Новости</h2>
                <div className="list-news-container-row-1">
                    <div className="list-news-list">
                        {news_list.map((news, newsIndex) => (
                            <div className="list-news-item" key={newsIndex}>
                                <div className="list-news-card"
                                     data-href={`/news/${news_list[newsIndex].id}`}
                                     onClick={(e) => handleNavigateClick(e.currentTarget.getAttribute('data-href'))}>
                                    <div className="list-news-card-date">
                                        {news_list[newsIndex].date}
                                    </div>
                                    <div className="list-news-card-title">
                                        {news_list[newsIndex].title}
                                    </div>
                                    <img className="list-news-card-image"
                                         src={news_list[newsIndex].image_url[0]}
                                         alt={"news_image_" + newsIndex}
                                    />
                                    <div className="list-news-card-content">
                                        {news_list[newsIndex].short_content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="list-news-container-row-2">
                    <Link className="list-news-load-more" to="/news">
                        Показать ещё
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ListNewsComponent;