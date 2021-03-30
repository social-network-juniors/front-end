import React from "react";

import {TextField, Button, Typography, InputAdornment} from "@material-ui/core";

import {useHistory} from "react-router-dom";


import {UserActions} from "../redux/reducers/user.reducer";

import {useFormik} from "formik";
import {useDispatch} from "react-redux";

import * as yup from "yup";

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const initialValues = {
	email: "",
	password: ""
};

const validationSchema = yup.object().shape({
	email: yup.string().email("Не похоже на почту").required("Это поле обязательно"),
	password: yup.string().required("Это поле обязательно")
});

const LoginForm = ({children, onSubmit}) =>
	<form className="Login-Form" noValidate onSubmit={onSubmit}>
		{children}
	</form>;

const LoginField = ({children}) =>
	<label className="Login-Form__Field">
		{children}
	</label>

const LoginSubmit = ({children}) =>
	<div className="Login-Form__Submit">
		{children}
	</div>

function Login() {
	const dispatch = useDispatch();
	const history = useHistory();

	const formik = useFormik({
		initialValues,
		validationSchema,
		validateOnBlur: true,
		validateOnChange: false,		
	});

	const errors = formik.errors;
	const touched = formik.touched;
	const values = formik.values;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(errors).length > 0)
			return;
			
		dispatch(UserActions.login(values.email, values.password));
	}


	return (
		<div className="Login-Root">
			<Typography variant="h1">Авторизация</Typography>
			<LoginForm onSubmit={handleSubmit}>
				<LoginField>
					Почта
					<TextField
						variant="outlined"
						name="email"
						type="email"
						value={values.email}
						onChange={formik.handleChange}
						InputProps={{
							startAdornment:
								<InputAdornment position="start">
									<AlternateEmailIcon />
								</InputAdornment>
						}} 
						size="small"
						error={touched.email && Boolean(errors.email)}
						label={touched.email && errors.email}
						onBlur={formik.handleBlur}/>
				</LoginField>
				<LoginField>
					Пароль
					<TextField
						variant="outlined"
						name="password"
						type="password"
						value={values.password}
						onChange={formik.handleChange}
						InputProps={{
							startAdornment:
								<InputAdornment position="start">
									<LockOpenIcon />
								</InputAdornment>
						}} 
						size="small"
						error={touched.password && Boolean(errors.password)}
						label={touched.password && errors.password}
						onBlur={formik.handleBlur}/>
				</LoginField>
				<LoginSubmit>
					<Button variant="contained" type="submit" disabled={Boolean(Object.keys(errors).length <= 0 && Object.keys(touched).length <= 0) || !formik.isValid}>Войти</Button>
					<Button onClick={() => history.push("/registration")}>Ещё не зарегистрированы?</Button>
				</LoginSubmit>
			</LoginForm>
		</div>
	);
}

export default Login;