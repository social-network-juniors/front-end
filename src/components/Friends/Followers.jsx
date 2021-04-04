import React from 'react'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
export default function FollowersList(props) {
    const followersData = props.followers;
    const followers = followersData.map((follower) =>
        <div>
            <img src={follower.avatar} />
            <div>{follower.first_name + ' ' + follower.second_name}</div>
            <DoneIcon />
            <CloseIcon />
        </div>
    )

    return (

        followersData.length ? followers : <div>У вас пока нет заявок</div>
    )
}
