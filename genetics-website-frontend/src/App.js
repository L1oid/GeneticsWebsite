import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "./view/pages/layout/page";
import ScrollToTop from "./view/components/scroll_to_top/component";

import NewsPage from './view/pages/public/news/page';
import NewsContentPage from './view/pages/public/news_content/page';

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<NewsPage />} />
                    <Route path="/news/:id" element={<NewsContentPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;