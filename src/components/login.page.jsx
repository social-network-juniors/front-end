import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import { UserActions } from "../redux/reducers/user.reducer";
import { useDispatch } from "react-redux";

function Login(props) {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(
			UserActions.replaceProfile({ username: "MichaleShumsky" })
		);
		dispatch(
			UserActions.changeLogged(true)
		);
	};

	const [loginValue, setLoginValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [isLoginWrong, setIsLoginWrong] = useState(false);
	let emailRegExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
	let phoneNumberRegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;


	useEffect(() => {
		const isEmail = emailRegExp.test(loginValue);
		const isNumber = phoneNumberRegExp.test(loginValue) && loginValue.length > 10;
		if (!(isEmail || isNumber || loginValue === '')) {
			setIsLoginWrong(true);
		} else { setIsLoginWrong(false) }
	}, [loginValue])


	return (
		<div>
			<p>Вход</p>
			<input type="email" value={loginValue} onChange={(e) => setLoginValue(e.target.value)} type='text' placeholder='email or number' />
			{isLoginWrong && <div>Please, enter a correct email or number</div>}
			<input value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} type='password' placeholder='password' />

			<div onClick={handleClick}>Войти</div>

			<div><Link to='/registration'>Ещё не зарегистрированы?</Link></div>

		</div>
	);
}

export default Login;