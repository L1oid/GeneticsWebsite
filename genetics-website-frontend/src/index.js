import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NewsPage from './view/pages/news/page.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const newsPage = ( <NewsPage /> );

const router = (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={newsPage} />
        </Routes>
    </BrowserRouter>
);

root.render(router);