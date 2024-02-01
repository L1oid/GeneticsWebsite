import React from 'react';

import './style.css';
import {useParams} from "react-router-dom";

import news_list from '../../../state/news_list'

function NewsContentComponent() {
    const {id} = useParams()

    return (
        <div>
            <h1>{news_list[id].title}</h1>
            <h2>{news_list[id].date}</h2>
            <p>{news_list[id].content}</p>
            <img src={news_list[id].image_url} alt={"news_image_" + id}/>
        </div>
    )
}

export default NewsContentComponent;