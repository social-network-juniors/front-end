import React from "react";

import {useSelector, useDispatch} from "react-redux";
import {UserActions} from "../redux/reducers/user.reducer";

function Profile(props) {
	const store = useSelector(store => store.user.profile);
	const dispatch = useDispatch();

	const handleClick = () => dispatch(UserActions.changeLogged(false));

	return (
		<div>
			<p>Профиль пользователя: {store.username}</p>
			<button onClick={handleClick}>Выйти</button>
		</div>
	)
}

export default Profile;