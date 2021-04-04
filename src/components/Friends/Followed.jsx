import React from 'react'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
export default function FollowedList(props) {
    const followedData = props.followed;
    const followed = followedData.map((followed) =>
        <div>
            <img src={followed.avatar} />
            <div>{followed.first_name + ' ' + followed.second_name}</div>
            <DoneIcon />
            <CloseIcon />
        </div>
    )

    return (

        followedData.length ? followed : <div>У вас пока нет заявок</div>
    )
}
