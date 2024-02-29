import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "./view/pages/layout/page";
import ScrollToTop from "./view/components/layout/scrollToTop/component";

import MainPage from './view/pages/public/main/page';
import OneNewsPage from "./view/pages/public/oneNews/page";
import NewsPage from "./view/pages/public/news/page";
import NotFoundPage from "./view/pages/public/notFound/page";

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/news/" element={<NewsPage />} />
                    <Route path="/news/:id" element={<OneNewsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;