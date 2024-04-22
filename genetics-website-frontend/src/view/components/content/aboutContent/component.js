import React from 'react';


import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";
import {useSelector} from "react-redux";
import parse from "html-react-parser";


function AboutContentComponent(props) {

    const aboutContent = useSelector(state => state.content.aboutContent);

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/about",
            name: "О кафедре"
        }
    ]

    return (
        <div className="page-container">
            <div className="about-container">
                <BreadcrumpComponent ways={ways}/>
                <h2 className="about-heading">О кафедре</h2>
                <p className="about-content-title">{aboutContent.title1}</p>
                <p className="about-content-text">{parse(aboutContent.content1)}</p>
                <p className="about-content-title">{aboutContent.title2}</p>
                <p className="about-content-text">{parse(aboutContent.content2)}</p>
                <p className="about-content-title">{aboutContent.title3}</p>
                <p className="about-content-text">{parse(aboutContent.content3)}</p>
                <div className="about-content-image-container">
                    <img className="about-content-image"
                         src={aboutContent.image1}
                         alt={"about_content_image_1"}
                    />
                    <img className="about-content-image"
                         src={aboutContent.image3}
                         alt={"about_content_image_3"}
                    />
                </div>
                <p className="about-content-title">{aboutContent.title4}</p>
                <p className="about-content-text">{parse(aboutContent.content4)}</p>
                <p className="about-content-title">{aboutContent.title5}</p>
                <p className="about-content-text">{parse(aboutContent.content5)}</p>
                <div className="about-content-image-container">
                    <img className="about-content-image"
                         src={aboutContent.image2}
                         alt={"about_content_image_2"}
                    />
                    <img className="about-content-image"
                         src={aboutContent.image4}
                         alt={"about_content_image_4"}
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutContentComponent;