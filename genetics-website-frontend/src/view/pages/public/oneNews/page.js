import React from 'react';

import ContentOneNewsComponent from "../../../components/news/contentOneNews/component";
import news_list from '../../../../data/news_list'
import {useParams} from "react-router-dom";

function OneNewsPage(props) {
    const {id} = useParams();

    return (
        <ContentOneNewsComponent
            id={id}
            images={news_list[id].image_url}
            title={news_list[id].title}
            date={news_list[id].date}
            content={news_list[id].content}/>
    )
}

export default OneNewsPage;