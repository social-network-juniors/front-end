import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import React from 'react'
import { Link } from 'react-router-dom';

export default function FriendsList(props) {
    let data = props.users;
    console.log(data)
    let users = data.map(
        (user) =>
            <div>
                <img src={user.avatar} />
                <div>{user.first_name + ' ' + user.last_name}</div>
                <Link to={`/profile/${user.id}`}><Button color="secondary">Просмотреть профиль</Button></Link>
                <Link to={`/chat/${user.id}`}><Button><ChatBubbleOutlineIcon /></Button></Link>
            </div>
    )
    let searchGlobal =
        <div>
            <div>Другие пользователи не найдены</div>
        </div>;

    return (
        <div>
            {data.length === 0 && searchGlobal || users}
        </div>
    )
}
