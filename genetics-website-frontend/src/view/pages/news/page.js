import React from 'react';

import Header from '../../components/header/component';
import SliderNews from '../../components/slider_news/component'
import MainMenu from '../../components/main_menu/component'
import OtherNews from '../../components/other_news/component'

function NewsPage() {
    return (
        <div>
            <Header />
            <MainMenu />
            <SliderNews />
            <OtherNews />
        </div>
    )
}

export default NewsPage;