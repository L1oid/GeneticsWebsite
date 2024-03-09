import React, {useState} from 'react';

import course_list from "../../../../data/course_list";
import ed_materials_list from "../../../../data/ed_materials_list";
import './style.css';

import BreadcrumpComponent from "../../common/breadcrump/component";
import CourseNavigationComponent from "../courseNavigation/component";

function CourseComponent() {

    const [itemListStatus, setItemListStatus] = useState(false);

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/education",
            name: "Образование"
        }
    ]

    return (
        <div className="page-container">
            <div className="course-container">
                <BreadcrumpComponent ways={ways}/>
                <p className="course-heading">Образование</p>
                <div className="column-course-container">
                    <div className="course-column-1">
                        <CourseNavigationComponent
                            setItemListStatus={setItemListStatus}
                            itemListStatus={itemListStatus}
                            courseList={course_list}
                        />
                    </div>
                    <div className="course-column-2">
                        <div className="course-content-container">
                            <p className="course-content-title">Образовательные материалы</p>
                            {ed_materials_list.map((material, materialIndex) => (
                                <div className="course-content-item" key={materialIndex}>
                                    <span className="material-symbols-outlined icon">picture_as_pdf</span>
                                    <a href={material.url} className="course-content-item-name">{material.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseComponent;