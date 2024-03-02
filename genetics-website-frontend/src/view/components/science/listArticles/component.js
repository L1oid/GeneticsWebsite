import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import './style.css';

import {fetchArticles, clearArticles} from "../../../../state/slices/scienceSlice";
import BreadcrumpComponent from "../../common/breadcrump/component";

function ListArticlesComponent() {
    const articles_list = useSelector(state => state.science.articles_list);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticles());
        return () => {
            dispatch(clearArticles());
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
            link: "/science",
            name: "Наука"
        }
    ]

    return (
        <div className="page-container">
            <div className="list-articles-container">
                <BreadcrumpComponent ways={ways}/>
                <h2 className="list-articles-heading">Наука</h2>
                <div className="list-articles-container-row-1">
                    <div className="list-articles-list">
                        {articles_list.map((article, articleIndex) => (
                            <div className="list-articles-item" key={articleIndex}>
                                <div className="list-articles-card"
                                     data-href={`/science/${article.id}`}
                                     onClick={(e) => handleNavigateClick(e.currentTarget.getAttribute('data-href'))}>
                                    <div className="list-articles-card-date">
                                        {article.date}
                                    </div>
                                    <div className="list-articles-card-title">
                                        {article.title}
                                    </div>
                                    <img className="list-articles-card-image"
                                         src={article.image_url[0]}
                                         alt={"article_image_" + articleIndex}
                                    />
                                    <div className="list-articles-card-content">
                                        {article.short_content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="list-articles-container-row-2">
                    <Link className="list-articles-load-more" to="/science">
                        Показать ещё
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ListArticlesComponent;