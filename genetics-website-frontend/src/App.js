import React from 'react';
import {Route, Routes} from 'react-router-dom';

import MainLayout from "./view/layouts/mainLayout/page";
import AccountLayout from "./view/layouts/accountLayout/page";
import ScrollToTop from "./view/components/layout/scrollToTop/component";

import MainPage from './view/pages/public/main/page';
import OneNewsPage from "./view/pages/public/oneNews/page";
import NewsPage from "./view/pages/public/news/page";
import NotFoundPage from "./view/pages/public/notFound/page";
import SciencePage from "./view/pages/public/science/page";
import ArticlePage from "./view/pages/public/article/page";
import EducationPage from "./view/pages/public/education/page";
import LoginPage from "./view/pages/public/login/page";
import PersonalDataPage from "./view/pages/private/personalData/page";
import ChangePasswordPage from "./view/pages/private/changePassword/page";
import RegistrationUserPage from "./view/pages/private/registrationUser/page";
import CreateNewsPage from "./view/pages/private/createNews/page";

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/login/" element={<LoginPage />} />
                    <Route path="/news/" element={<NewsPage />} />
                    <Route path="/news/:id" element={<OneNewsPage />} />
                    <Route path="/science/" element={<SciencePage />} />
                    <Route path="/science/:id" element={<ArticlePage />} />
                    <Route path="/education/" element={<EducationPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/account" element={<AccountLayout />}>
                        <Route index element={<PersonalDataPage />} />
                        <Route path="/account/change-password/" element={<ChangePasswordPage />} />
                        <Route path="/account/registration-user/" element={<RegistrationUserPage />} />
                        <Route path="/account/create-news/" element={<CreateNewsPage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;