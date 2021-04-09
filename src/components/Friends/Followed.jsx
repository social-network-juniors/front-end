import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { friendsThunk } from "../../redux/reducers/friends.reducer";

import { getAuthorizationHeader } from '../../services'

export default function FollowedList(props) {
    const followedData = props.followed;
    const followed = followedData.map((followed) =>
        <div>
            <img src={followed.avatar} />
            <div>{followed.full_name}</div>
            <div onClick={() => unfollow(followed.id)}>Отписаться</div>
        </div>
    )
    const dispatch = useDispatch();
    const isInProcess = useSelector(store => store.friends.isInProcess);

    let tokenHeader = getAuthorizationHeader();

    const unfollow = (id) => {
        if (isInProcess) return;
        dispatch(friendsThunk.unfollowUser(tokenHeader, id))
        dispatch(friendsThunk.getFollowed(tokenHeader))

    }
    return (

        followedData.length ? followed : <div>Вы ещё ни на кого не подписались</div>
    )
}
