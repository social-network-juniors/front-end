import React from "react";

import {UserActions} from "../redux/reducers/user.reducer";
import {useDispatch} from "react-redux";

function Login(props) {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(
			UserActions.replaceProfile({username: "MichaleShumsky"})
		);
		dispatch(
			UserActions.changeLogged(true)
		);
	};

	return (
		<div>
			<p>Страница авторизации.</p>
			<button onClick={handleClick}>Симулировать авторизацию в стэйте</button>
			<h2>Сейчас вы не авторизованы</h2>
		</div>
	);
}

export default Login;