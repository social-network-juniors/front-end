import { Button } from '@material-ui/core';

import React from 'react'
import { Link } from 'react-router-dom';

export default function FriendItem(props) {
    let data = props.friends;
    let friends = data.map(
        (friend) =>
            <div>
                <img src={friend.avatar} />
                <div>{friend.name}</div>
                <Link to={`/chat/${friend.id}`}><Button color="primary">Написать сообщение</Button></Link>
                <Link to={`/profile/${friend.id}`}><Button color="secondary">Просмотреть профиль</Button></Link>
            </div>
    )
    return (
        <div>
            {friends}
        </div>
    )
}
