import React, { useState, useEffect } from 'react'

import FiberNewIcon from '@material-ui/icons/FiberNew';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import { Link } from 'react-router-dom';


export default function ChatsMenu(props) {



    const chatsData = props.chats;
    const foundUsers = props.foundUsers;
    const chatsList = chatsData.map(chat =>
        <Link to={'/chat/' + chat.id}>
            <img src={chat.avatar} />
            <div>{chat.first_name + ' ' + chat.last_name}</div>
            <div>{chat.lastMessage}</div>
            {!chat.isRead && <FiberNewIcon />}
        </Link>
    )
    const foundUsersList = foundUsers.map(user =>
        <div to={'/chat/' + user.id}>
            <Link to={'/profile/' + user.id}><div>{user.first_name + ' ' + user.last_name}</div></Link>
            <Link to={'/chat/' + user.id}><ChatBubbleOutlineIcon /></Link>
        </div>
    )


    return (
        <div>
            {chatsList}
            {foundUsers.length === 0 ? null : foundUsersList}
        </div>
    )
}
