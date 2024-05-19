import React from "react";

import "./style.css"

function PlusButtonComponent(props) {
    return (
        <button className={`plus-button ${props.status === "loading" ? "disabled" : ""}`}
                onClick={props.handle}
                disabled={props.status === "loading"}>
            <span className="material-symbols-outlined">add</span>
        </button>
    )
}

export default PlusButtonComponent;