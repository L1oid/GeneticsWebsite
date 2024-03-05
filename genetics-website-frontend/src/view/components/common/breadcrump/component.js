import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BreadcrumpComponent(props) {
    const burgerMenuStatus = useSelector(state => state.layout.burgerMenuStatus);
    
    const containerClass = burgerMenuStatus ? 'breadcrumb-container with-margin' : 'breadcrumb-container';

    return (
        <div className={containerClass}>
            {props.ways.map((way, wayIndex) => (
                <div className="breadcrumb-item" key={wayIndex}>
                    {wayIndex !== props.ways.length - 1 && (
                        <Link className="breadcrumb-text" to={way.link}>
                            {way.name}
                        </Link>
                    )}
                    {wayIndex === props.ways.length - 1 && way.name}
                </div>
            ))}
        </div>
    );
}

export default BreadcrumpComponent;
