import React from 'react';

import './style.css';
import {Link} from "react-router-dom";
import {removeUser} from "../../../../state/slices/userSlice";
import {useDispatch} from "react-redux";

function AccountMenuComponent(props) {
    const dispatch = useDispatch();

    return (
        <div className="account-menu">
            <button onClick={(e) => dispatch(removeUser())}>Выйти</button>
        </div>
    )
}

export default AccountMenuComponent;