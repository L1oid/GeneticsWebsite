import React, {useRef} from 'react';

import "./style.css"

import genetics_bg1 from "./gen1.jpeg";
import genetics_bg2 from "./gen2.jpg";
import genetics_bg3 from "./gen3.jpg";

function SliderNewsComponent() {
    let bgContainerRef = useRef(null)

    const bg_images = [genetics_bg1, genetics_bg2, genetics_bg3]

    const prev = () => {
        bgContainerRef.current.scrollLeft -= 1000;
    };

    const next = () => {
        bgContainerRef.current.scrollLeft += 1000;
    };

    return (
        <div className="slider-container">
            <div className="prev" onClick={prev}></div>
            <div className="slide-panel" ref={bgContainerRef}>
                {bg_images.map((bg, index) => {
                    return <img key={index} src={bg} alt={`background-${index}`} />;
                })}
            </div>
            <div className="next" onClick={next}></div>
        </div>
    )
}

export default SliderNewsComponent;