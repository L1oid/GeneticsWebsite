import React, {useEffect, useState} from 'react';

import ListContentComponent from "../../../components/content/listContent/component";
import {useDispatch, useSelector} from "react-redux";
import {fetchContent} from "../../../../state/slices/content/asyncActions";
import {NEWS} from "../../../../state/consts/contentTypes";

function NewsPage() {

    const [amount, setAmount] = useState(6);
    const dispatch = useDispatch();
    const contentList = useSelector(state => state.content.newsList);

    useEffect(() => {
        dispatch(fetchContent({ type: NEWS, amount: amount }));
    }, [amount, dispatch])

    return (
        <ListContentComponent
            contentList={contentList}
            amount={amount}
            setAmount={setAmount}
            type={NEWS}
            titleType={"Новости"}
        />
    )
}

export default NewsPage;