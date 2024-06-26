import React from 'react';
import {Route, Routes} from 'react-router-dom';

import MainLayout from "./view/layouts/mainLayout/page";
import AccountLayout from "./view/layouts/accountLayout/page";
import ScrollToTop from "./view/components/layout/scrollToTop/component";

import MainPage from './view/pages/public/content/main/page';
import OneNewsPage from "./view/pages/public/content/oneNews/page";
import NewsPage from "./view/pages/public/content/news/page";
import NotFoundPage from "./view/pages/public/common/notFound/page";
import SciencePage from "./view/pages/public/content/science/page";
import ArticlePage from "./view/pages/public/content/article/page";
import LoginPage from "./view/pages/public/user/login/page";
import PersonalDataPage from "./view/pages/private/user/personalData/page";
import ChangePasswordPage from "./view/pages/private/user/changePassword/page";
import RegistrationUserPage from "./view/pages/private/user/registrationUser/page";
import CreateNewsPage from "./view/pages/private/content/createNews/page";
import AboutPage from "./view/pages/public/content/about/page";
import ListContentPage from "./view/pages/private/content/listNews/page";
import EditContentPage from "./view/pages/private/content/editContent/page";
import CreateEventPage from "./view/pages/private/content/createEvent/page";
import CreateQuestionnairePage from "./view/pages/private/content/createQuestionnaire/page";
import ListUsersPage from "./view/pages/private/user/listUsers/page";
import ListQuestionnairePage from "./view/pages/private/content/listQuestionnaire/page";
import ListEventsPage from "./view/pages/private/content/listEvents/page";
import QuestionnairesPage from "./view/pages/public/content/questionnaires/page";
import QuestionnairePage from "./view/pages/public/content/questionnaire/page";
import EducationLayout from "./view/layouts/educationLayout/page";
import CoursePage from "./view/pages/public/content/course/page";
import CourseHelloContainerComponent from "./view/components/content/courseHelloContainer/component";
import CreateCoursePage from "./view/pages/private/content/createCourse/page";
import ListCoursesContainerComponent from "./view/components/content/listCoursesContainer/components";
import EditUserPage from "./view/pages/private/user/editUser/page";

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/login/" element={<LoginPage />} />
                    <Route path="/about/" element={<AboutPage />} />
                    <Route path="/news/" element={<NewsPage />} />
                    <Route path="/news/:id" element={<OneNewsPage />} />
                    <Route path="/science/" element={<SciencePage />} />
                    <Route path="/science/:id" element={<ArticlePage />} />
                    <Route path="/questionnaires/" element={<QuestionnairesPage />} />
                    <Route path="/questionnaires/:id" element={<QuestionnairePage />} />
                    <Route path="/education/" element={<EducationLayout />} >
                        <Route index element={<CourseHelloContainerComponent />} />
                        <Route path="/education/:id" element={<CoursePage />} />
                    </Route>
                    <Route path="/account" element={<AccountLayout />}>
                        <Route index element={<PersonalDataPage />} />
                        <Route path="/account/change-password/" element={<ChangePasswordPage />} />
                        <Route path="/account/registration-user/" element={<RegistrationUserPage />} />
                        <Route path="/account/users-list/" element={<ListUsersPage />} />
                        <Route path="/account/users-list/edit-user/:id" element={<EditUserPage />} />
                        <Route path="/account/create-content/" element={<CreateNewsPage />} />
                        <Route path="/account/content-list/" element={<ListContentPage />} />
                        <Route path="/account/content-list/edit-content/:id" element={<EditContentPage />} />
                        <Route path="/account/create-event/" element={<CreateEventPage />} />
                        <Route path="/account/event-list/" element={<ListEventsPage />} />
                        <Route path="/account/create-questionnaire/" element={<CreateQuestionnairePage />} />
                        <Route path="/account/questionnaire-list/" element={<ListQuestionnairePage />} />
                        <Route path="/account/create-course/" element={<CreateCoursePage />} />
                        <Route path="/account/courses-list/" element={<ListCoursesContainerComponent />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;