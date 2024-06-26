import React, {useEffect, useState} from 'react';
import parse from 'html-react-parser';

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";
import {formatDate} from "../../../../state/functions/formatDate";
import SingleContentHeadingComponent from "../../common/singleContentHeading/component";
import AccountPageTitleComponent from "../../common/accountPageTitle/component";

function SingleContentComponent(props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        function goToNext() {
            const isLastImage = currentIndex === props.images.length - 1;
            const newIndex = isLastImage ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }

        let interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    });

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? props.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastImage = currentIndex === props.images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/" + props.type,
            name: props.titleType
        },
        {
            link: "/" + props.type + "/" + props.id,
            name: props.title
        },
    ]

    return (
        <div className="page-container">
            <div className="single-content-container">
                <BreadcrumpComponent ways={ways}/>
                <SingleContentHeadingComponent title={props.title}/>
                <h2 className="single-content-date">
                    {formatDate(props.date)}
                </h2>
                <div className="single-content-text">
                    {parse(props.content)}
                </div>
                {props.images.length !== 0 && (
                    <div>
                        <h2 className="single-content-count-images">
                            {currentIndex + 1}/{props.images.length}
                        </h2>
                        <div className={props.contactInfo && props.contactInfo !== "<p><br></p>" ? "single-content-slider" : "single-content-slider with-margin-bottom-30"}>
                            <span className="material-symbols-outlined single-content-slider-left"
                                  onClick={goToPrevious}>chevron_left</span>
                            <span className="material-symbols-outlined single-content-slider-right"
                                  onClick={goToNext}>chevron_right</span>
                            <img className="single-content-slider-image"
                                 src={props.images[currentIndex]}
                                 alt={"content_image_" + currentIndex}
                            />
                        </div>
                    </div>
                )}
                {props.contactInfo && props.contactInfo !== "<p><br></p>" && (
                    <div className="single-content-contact-us">
                        <AccountPageTitleComponent title={"Свяжитесь с нами"}/>
                        <div className="single-content-contact-us-text">
                            {parse(props.contactInfo)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleContentComponent;