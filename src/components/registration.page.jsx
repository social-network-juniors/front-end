import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { UserActions } from "../redux/reducers/user.reducer";
import { useDispatch } from "react-redux";
import { registration } from '../api/rest/registration';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { setCookie } from "../utils";

function Registration(props) {
    //redux
    const dispatch = useDispatch();
    const logIn = () => {
        dispatch(UserActions.changeLogged(true));
    };




    //vars and states
    const [inputData, setInputData] = useState({
        login: '',
        password: '',
        passwordConfirmation: '',
        name: '',
        lastName: '',
        bdate: [],
    });
    const [isCorrect, setIsCorrect] = useState({
        login: true,
        password: true,
        passwordConfirmation: true,
        name: true,
        lastName: true,
        bdate: true,
    })
    const [dateInput, setDateInput] = useState('');
    const [isdataEntered, setIsdataEntered] = useState(false);
    const isLogAndPasswordEntered = isCorrect.login && isCorrect.password && isCorrect.passwordConfirmation && inputData.passwordConfirmation !== '' && inputData.login !== '';

    //regular exp.
    let emailRegExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    let phoneNumberRegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    let nameRegExp = /^([а-яё]+|[a-z]+)$/i;

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

        if (inputData.password === '' || inputData.password.length >= 8) {
            setIsCorrect({ ...isCorrect, password: true })
        } else {
            setIsCorrect({ ...isCorrect, password: false })
        }
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

    //date validation
    useEffect(() => {
        let nums = inputData.bdate;
        let date = `${nums[0] || '_'}${nums[1] || '_'}/${nums[2] || '_'}${nums[3] || '_'}/${nums[4] || '_'}${nums[5] || '_'}${nums[6] || '_'}${nums[7] || '_'}`
        setDateInput(date);
        if (inputData.bdate[7]) {

            let arr = date.split('/');
            let day = arr[0];
            let month = arr[1];
            let year = arr[2];
            let littleMonths = [2, 4, 6, 9, 11];

            setIsCorrect({ ...isCorrect, bdate: true });
            if (year >= 2006 || year <= 1900) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (month > 12 || month <= 0) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (day > 31 || day <= 0) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (littleMonths.includes(inputData.bmonth) && day === 31) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (month == 2 && day >= 30) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (year % 4 !== 0 && month == 2 && day == 29) { setIsCorrect({ ...isCorrect, bdate: false }) }
        }

    }, [inputData.bdate, dateInput])

    //date input handler
    const handleDate = (e) => {
        if (!isNaN(Number(e.key)) && inputData.bdate.length < 8) {
            setInputData({ ...inputData, bdate: [...inputData.bdate, e.key] })
        }
        if (e.key == 'Backspace') {
            let newArr = inputData.bdate.splice(0, inputData.bdate.length - 1)
            setInputData({ ...inputData, bdate: newArr })
        }
    }

    //checker for registration request
    useEffect(() => {
        setIsdataEntered(true)
        for (const input in inputData) {
            if (inputData[input].length === 0) setIsdataEntered(false);
        }
        for (const input in isCorrect) {
            if (isCorrect[input] == false) setIsdataEntered(false);

        }

    }, [inputData, isCorrect]);

    const registerRequest = () => {
        const bday = Number(dateInput.split('/')[0]);
        const bmonth = Number(dateInput.split('/')[1]);
        const byear = Number(dateInput.split('/')[2]);
        if (isdataEntered) {
            registration(inputData.login, inputData.password, inputData.passwordConfirmation, inputData.name, inputData.lastName, bday, bmonth, byear)
                .then((response) => {

                    let token = response.data.result.token;
                    setCookie('AuthToken', token, { 'max-age': 360000 });
                    let name = "my name";
                    let value = "John Smith"



                    logIn()
                    // response.data.token
                    // if success =>
                    // let token 

                    // set cookie = AuthToken, token

                    // is logged true

                    // =redirect to Profile

                    // profile didM -> dispatch setProfData (cookie)

                })
                .catch((error) => {
                    let mess = error.response.data.errors.login[0];
                    if (mess == 'The login has already been taken.') {
                        alert('Такой логин уже зарегистрирован');
                        console.log(mess)
                    }
                });

        } else { console.log('enter all the data') }
    }

    //render
    return (
        <div className='Registration__wrapper'>
            <h1 className='Registration__title' >Регистрация</h1>
            <div className='Registration__login'>
                <TextField error={!isCorrect.login} helperText={isCorrect.login ? false : 'Введите верный телефон или почту'} type="email" onChange={(e) => setInputData({ ...inputData, login: e.target.value })} placeholder='Почта или телефон' />
                <TextField error={!isCorrect.password} helperText={isCorrect.password ? false : 'Пароль должен содержать минимум 8 символов'} onChange={(e) => setInputData({ ...inputData, password: e.target.value })} type='password' placeholder='Пароль' />
                <TextField error={!isCorrect.passwordConfirmation} helperText={isCorrect.passwordConfirmation ? false : 'Пароли не совпадают'} onChange={(e) => setInputData({ ...inputData, passwordConfirmation: e.target.value })} type='password' placeholder='Подтвердите пароль' />
            </div>
            { isLogAndPasswordEntered &&
                <div className='Registration__data'>
                    <TextField className='Registration__name' error={!isCorrect.name} helperText={isCorrect.name ? false : 'Имя должно быть либо на латинице, либо на кириллице'} placeholder='Имя' onChange={(e) => setInputData({ ...inputData, name: e.target.value })} />
                    <TextField className='Registration__name' error={!isCorrect.lastName} helperText={isCorrect.lastName ? false : 'Фамилия должна быть либо на латинице, либо на кириллице'} placeholder='Фамилия' onChange={(e) => setInputData({ ...inputData, lastName: e.target.value })} />
                    <TextField error={!isCorrect.bdate} onKeyUp={(e) => handleDate(e)} value={dateInput} placeholder='__/__/____' type="text" />
                </div>
            }
            <Button onClick={registerRequest}>Зарегистрироваться</Button>
            <div><Link to='/login'>Уже есть аккаунт?</Link></div>
        </div>
    );
}

export default Registration;