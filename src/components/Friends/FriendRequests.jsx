import React from 'react'

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from "react-redux";
import { friendsThunk } from "../../redux/reducers/friends.reducer";

import { getAuthorizationHeader } from '../../services'

export default function FriendsRequest(props) {

    const dispatch = useDispatch();
    const isInProcess = useSelector(store => store.friends.isInProcess);

    let tokenHeader = getAuthorizationHeader();

    const acceptFriend = (id) => {
        if (isInProcess) return;
        dispatch(friendsThunk.acceptFriend(tokenHeader, id))
    }
    const rejectFriend = (id) => {
        if (isInProcess) return;
        dispatch(friendsThunk.rejectFriend(tokenHeader, id))
    }

    const requestsData = props.requests;
    const requests = requestsData.map((requests) =>
        <div>
            <img src={requests.avatar} />
            <div>{requests.full_name}</div>
            <AddIcon onClick={() => acceptFriend(requests.id)} />
            <CloseIcon onClick={() => rejectFriend(requests.id)} />
        </div>
    )

    return (

        requestsData.length ? requests : <div>У вас пока нет заявок</div>
    )
}
