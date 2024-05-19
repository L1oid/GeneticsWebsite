import React, {useEffect, useState} from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import AccountPageInputComponent from "../../common/accountPageInput/component";
import TextEditorComponent from "../../common/textEditor/component";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";
import {useDispatch, useSelector} from "react-redux";
import AccountPageButtonComponent from "../../common/accountPageButton/component";
import {eventCreation} from "../../../../state/slices/content/asyncActions";
import {clearContentErrorStatusSuccess} from "../../../../state/slices/content/contentSlice";
import {useLocation} from "react-router-dom";

function CreateEventContainerComponent(props) {

    const dispatch = useDispatch();
    const location = useLocation();

    const {error, success, status} = useSelector(state => state.content);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [scheduledFor, setScheduledFor] = useState("")
    const [rendezvous, setRendezvous] = useState("")

    useEffect(() => {
        dispatch(clearContentErrorStatusSuccess());
    }, [dispatch, location]);

    const handleButtonConfirm = () => {
        const event = {
            title: title,
            description: description,
            scheduledFor: scheduledFor,
            rendezvous: rendezvous
        }
        dispatch(eventCreation(event))
    }

    return (
        <div className="create-event-container">
            <div className="create-event-container-row-1">
                <AccountPageTitleComponent
                    title="Создание событий" />
            </div>
            <div className="create-event-container-row-2">
                <AccountPageSubtitleComponent
                    title={"Название"}/>
                <div className="create-event-title-input">
                    <AccountPageInputComponent
                        type="text"
                        value={title}
                        handle={(e) => setTitle(e.target.value)}
                        disabled={false}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Описание"}/>
                <TextEditorComponent
                    value={description}
                    setValue={setDescription}/>
                <AccountPageSubtitleComponent
                    title={"Место события"}/>
                <div className="create-event-title-input">
                    <AccountPageInputComponent
                        type="text"
                        value={rendezvous}
                        handle={(e) => setRendezvous(e.target.value)}
                        disabled={false}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Дата и время события"}/>
                <div className="create-event-title-input">
                    <AccountPageInputComponent
                        type="datetime-local"
                        value={scheduledFor}
                        handle={(e) => setScheduledFor(e.target.value)}
                        disabled={false}/>
                </div>
                <div className="create-event-button-wrapper">
                    <AccountPageButtonComponent
                        status={status}
                        title={"Подтвердить"}
                        handle={handleButtonConfirm}/>
                </div>
                <ErrorAndSuccessWindowComponent error={error} success={success}/>
            </div>
        </div>
    )
}

export default CreateEventContainerComponent;
