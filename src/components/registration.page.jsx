import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { UserActions } from "../redux/reducers/user.reducer";
import { useDispatch } from "react-redux";
import { registration } from '../api/rest/registration';
import TextField from '@material-ui/core/TextField';

function Registration(props) {

    // //redux
    // const dispatch = useDispatch();
    // const handleClick = () => {
    //     dispatch(
    //         UserActions.replaceProfile({ username: "MichaleShumsky" })
    //     );
    //     dispatch(
    //         UserActions.changeLogged(true)
    //     );
    // };

    //vars and states
    const [inputData, setInputData] = useState({
        login: '',
        password: '',
        passwordConfirmation: '',
        name: '',
        lastName: '',
        bday: '',
        bmonth: '',
        byear: '',
    });
    const [isCorrect, setIsCorrect] = useState({
        login: true,
        password: true,
        passwordConfirmation: true,
        name: true,
        lastName: true,
        bday: true,
        bmonth: true,
        byear: true,
    })
    const isLogAndPasswordEntered = isCorrect.login && isCorrect.password && isCorrect.passwordConfirmation && inputData.passwordConfirmation !== '' && inputData.login !== '';

    //regular exp.
    let emailRegExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    let phoneNumberRegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    let nameRegExp = /^[\wА-Яа-я]{2,20}$/i;

    // login validation
    useEffect(() => {
        const isEmail = emailRegExp.test(inputData.login);
        const isNumber = phoneNumberRegExp.test(inputData.login) && inputData.login.length > 10;

        if (isEmail || isNumber || inputData.login === '') {
            setIsCorrect({ ...isCorrect, login: true });
        } else {
            setIsCorrect({ ...isCorrect, login: false });
        }

    }, [inputData.login])

    // password validation
    useEffect(() => {
        if (inputData.password == '') {
            setIsCorrect({ ...isCorrect, password: true })
        } else {
            setIsCorrect({ ...isCorrect, password: false })
        }
        console.log(inputData.password);
    }, [inputData.password])

    // password confirmation validation
    useEffect(() => {
        if (inputData.passwordConfirmation === inputData.password || inputData.passwordConfirmation == '') {
            setIsCorrect({ ...isCorrect, passwordConfirmation: true });
        } else {
            setIsCorrect({ ...isCorrect, passwordConfirmation: false });
        }
    }, [inputData.password, inputData.passwordConfirmation])

    // name validation
    useEffect(() => {
        if (nameRegExp.test(inputData.name) || inputData.name === '') {
            setIsCorrect({ ...isCorrect, name: true });
        } else {
            setIsCorrect({ ...isCorrect, name: false });
        }
    }, [inputData.name])

    // last name validation
    useEffect(() => {
        if (nameRegExp.test(inputData.lastName) || inputData.lastName === '') {
            setIsCorrect({ ...isCorrect, lastName: true });
        } else {
            setIsCorrect({ ...isCorrect, lastName: false });
        }
    }, [inputData.lastName])

    // const registerRequest = () => {
    //     let isDataEntered = userData.login && userData.password && userData.passwordConfirmation && userData.name && userData.lastName && userData.byear;
    //     if (isDataEntered) {
    //         registration(userData.login, userData.password, userData.passwordConfirmation, userData.name, userData.lastName, userData.bday, userData.bmonth, userData.byear);
    //     } else {
    //         console.log(userData);
    //     };
    // }

    //render
    return (
        <div>
            <p>Регистрация</p>
            <TextField error={!isCorrect.login} helperText={isCorrect.login ? false : 'Введите верный телефон или почту'} type="email" onChange={(e) => setInputData({ ...inputData, login: e.target.value })} placeholder='Почта или телефон' />

            <TextField error={!isCorrect.password} helperText={isCorrect.password ? false : 'Пароль должен содержать минимум 8 символов'} onChange={(e) => setInputData({ ...inputData, password: e.target.value })} placeholder='Пароль' />

            <TextField error={!isCorrect.passwordConfirmation} helperText={isCorrect.passwordConfirmation ? false : 'Пароли не совпадают'} onChange={(e) => setInputData({ ...inputData, passwordConfirmation: e.target.value })} type='password' placeholder='Подтвердите пароль' />
            { isLogAndPasswordEntered &&
                <div>
                    <TextField error={!isCorrect.name} helperText={isCorrect.name ? false : 'Имя должено содержать минимум 2 буквы'} placeholder='Имя' onChange={(e) => setInputData({ ...inputData, name: e.target.value })} />
                    <TextField error={!isCorrect.lastName} helperText={isCorrect.lastName ? false : 'Фамилия должна содержать минимум 2 буквы'} placeholder='Фамилия' onChange={(e) => setInputData({ ...inputData, lastName: e.target.value })} />
                    <TextField id="date" placeholder="Birthday" type="date" />
                </div>
            }
            {/* <div onClick={registerRequest}>Зарегистрироваться</div> */}
            <div><Link to='/login'>Уже есть аккаунт?</Link></div>
        </div>
    );
}

export default Registration;