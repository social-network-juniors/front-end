import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import AddIcon from '@material-ui/icons/Add';
import React from 'react'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { thunksCreators } from "../../redux/reducers/friends.reducer";

import { getAuthorizationHeader } from '../../services'

export default function FriendsList(props) {
    let data = props.users;
    console.log(data)

    const dispatch = useDispatch();
    const isInProcess = useSelector(store => store.friends.isInProcess);
    let tokenHeader = getAuthorizationHeader();

    const addFriend = (id) => {
        // if (isInProcess) return;
        dispatch(thunksCreators.addToFriends(tokenHeader, id))
    }
    const follow = (id) => {
        if (isInProcess) return;
        dispatch(thunksCreators.followUser(tokenHeader, id))
        dispatch(thunksCreators.getFollowed(tokenHeader))

    }
    let users = data.map(
        (user) =>
            <div>
                <img src={user.avatar} />
                <div>{user.first_name + ' ' + user.last_name}</div>
                <Link to={`/profile/${user.id}`}><Button color="secondary">Просмотреть профиль</Button></Link>
                <Link to={`/chat/${user.id}`}><Button><ChatBubbleOutlineIcon /></Button></Link>
                <AddIcon onClick={() => addFriend(user.id)} />
                <AddAlertIcon onClick={() => follow(user.id)} />
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
