import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "./view/pages/layout/page";
import ScrollToTop from "./view/components/scroll_to_top/component";

import NewsPage from './view/pages/public/news/page';
import NewsContentPage from './view/pages/public/news_item/page';
import SciencePage from './view/pages/public/science/page'
import EducationPage from './view/pages/public/education/page'
import AboutPage from './view/pages/public/about/page'

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<NewsPage />} />
                    <Route path="/news/:id" element={<NewsContentPage />} />
                    <Route path="/science" element={<SciencePage />} />
                    <Route path="/education" element={<EducationPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;