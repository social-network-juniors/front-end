import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { thunksCreators } from "../../redux/reducers/friends.reducer";

export default function ChatBody() {

    let messagesData = useSelector(store => store.chat.currentChatMessages);
    let userData = useSelector(store => store.chat.currentInterlocutor);
    let userHeader =
        <div>
            <div>{userData.fullname}</div>
            <div onClick={() => { console.log(userData.id) }}><img src={userData.avatar} /></div>
        </div>
    let messages = messagesData.map(i => <li>{i.text}</li>);

    return (
        <div>
            <div className={'header'}>
                {userHeader}
            </div>
            {messages}
        </div>
    )
}
