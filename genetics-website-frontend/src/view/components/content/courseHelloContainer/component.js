import React from 'react';

import './style.css';

function CourseHelloContainerComponent(props) {
    return (
        <div className="course-hello-container">
            <p className="course-hello-title">Добро пожаловать в образовательную среду !</p>
            <p className="course-hello-subtitle">Выберите интересующий вас материал из меню.</p>
            <p className="course-hello-subtitle">Для получения доступа к
                курсам "Для студентов", пожалуйста, обратитесь на кафедру для получения аккаунта.</p>
        </div>
    );
}

export default CourseHelloContainerComponent;
