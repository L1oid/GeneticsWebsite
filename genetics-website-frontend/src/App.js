import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "./view/pages/layout/page";
import ScrollToTop from "./view/components/layout/scrollToTop/component";

import NewsPage from './view/pages/public/news/page';
import OneNewsPage from "./view/pages/public/oneNews/page";

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<NewsPage />} />
                    <Route path="/news/:id" element={<OneNewsPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;