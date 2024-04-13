import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {fetchContent} from "../../../../state/slices/content/asyncActions";
import {ARTICLE} from "../../../../state/consts/contentTypes";
import ListContentComponent from "../../../components/content/listContent/component";

function SciencePage() {

    const [amount, setAmount] = useState(6);
    const dispatch = useDispatch();
    const contentList = useSelector(state => state.content.articleList);

    useEffect(() => {
        dispatch(fetchContent({ type: ARTICLE, amount: amount }));
    }, [amount, dispatch])


    return (
        <ListContentComponent
            contentList={contentList}
            amount={amount}
            setAmount={setAmount}
            type={ARTICLE}
            titleType={"Наука"}
        />
    )
}

export default SciencePage;