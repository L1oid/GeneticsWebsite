import React from 'react';

import './style.css';

function CourseHelloContainerComponent(props) {
    return (
        <div className="course-hello-container">
            <p className="course-hello-title">Добро пожаловать в образовательную среду !</p>
            <p className="course-hello-subtitle">Выберите интересующий вас материал из меню.</p>
        </div>
    );
}

export default CourseHelloContainerComponent;
