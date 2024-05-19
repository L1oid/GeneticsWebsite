import React, {useEffect} from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import ListTableComponent from "../../common/listTable/component";
import {useDispatch, useSelector} from "react-redux";
import {eventDeletion, fetchEvents} from "../../../../state/slices/content/asyncActions";
import {EVENTS} from "../../../../state/consts/contentTypes";
import {setRerenderAfterDeleteFalse} from "../../../../state/slices/content/contentSlice";

function ListEventsContainerComponent(props) {

    const {status, rerenderAfterDelete} = useSelector(state => state.content);
    const eventList = useSelector(state => state.content.eventList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvents({amount: 999}));
    }, [dispatch])

    useEffect(() => {
        if (rerenderAfterDelete === true) {
            dispatch(fetchEvents({amount: 999}));
            dispatch(setRerenderAfterDeleteFalse());
        }
    }, [dispatch, rerenderAfterDelete]);

    const deleteButtonHandle = (id) => {
        dispatch(eventDeletion(id))
    }

    return (
        <div className="list-events-container">
            <AccountPageTitleComponent
                title="Список событий"/>
            <div className="list-events-container-row-2">
                <AccountPageSubtitleComponent
                    title={"Список"}/>
                <ListTableComponent
                    status={status}
                    eventList={eventList}
                    contentType={EVENTS}
                    deleteButtonHandle={deleteButtonHandle}/>
            </div>
        </div>
    )
}

export default ListEventsContainerComponent;
