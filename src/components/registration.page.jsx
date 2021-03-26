import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { UserActions } from "../redux/reducers/user.reducer";
import { useDispatch } from "react-redux";
import { registration } from '../api/rest/registration';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'


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


    // if (year >= 2006 || year <= 1900) { setIsBDate(false); }
    // if (month > 12 || month <= 0) { setIsBDate(false); }
    // if (day > 31 || day <= 0) { setIsBDate(false); }
    // if (littleMonths.includes(month) && day === 31) { setIsBDate(false); }
    // if (month == 2 && day >= 30) { setIsBDate(false); }
    // if (year % 4 !== 0 && month == 2 && day == 29) { setIsBDate(false); }

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




    const handleDate = (e) => {
        if (!isNaN(Number(e.key)) && inputData.bdate.length < 8) {
            setInputData({ ...inputData, bdate: [...inputData.bdate, e.key] })
        }
        if (e.key == 'Backspace') {
            let newArr = inputData.bdate.splice(0, inputData.bdate.length - 1)
            setInputData({ ...inputData, bdate: newArr })
        }


    }
    useEffect(() => {
        let nums = inputData.bdate;
        console.log(nums);
        let date = `${nums[0] || '_'}${nums[1] || '_'}/${nums[2] || '_'}${nums[3] || '_'}/${nums[4] || '_'}${nums[5] || '_'}${nums[6] || '_'}${nums[7] || '_'}`
        setDateInput(date);
        if (inputData.bdate[7]) {
            let arr = dateInput.split('/');

            let day = arr[0];
            let month = arr[1];
            let year = arr[2];
            const littleMonths = [2, 4, 6, 9, 11];
            setIsCorrect({ ...isCorrect, bdate: true });
            if (year >= 2006 || year <= 1900 || year != '') { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (month > 12 || month <= 0) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (day > 31 || day <= 0) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (littleMonths.includes(inputData.bmonth) && day === 31) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (month == 2 && day >= 30) { setIsCorrect({ ...isCorrect, bdate: false }) }
            if (year % 4 !== 0 && month == 2 && day == 29) { setIsCorrect({ ...isCorrect, bdate: false }) }
        }

    }, [inputData.bdate])

    const registerRequest = () => {
        // let isDataEntered = userData.login && userData.password && userData.passwordConfirmation && userData.name && userData.lastName && userData.byear;
        if (true) {
            registration(inputData.login, inputData.password, inputData.passwordConfirmation, inputData.name, inputData.lastName, 1, 1, 1999);
        } else {
            console.log(inputData);
        };
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
                    <TextField className='Registration__name' error={!isCorrect.name} helperText={isCorrect.name ? false : 'Имя должено содержать минимум 2 буквы'} placeholder='Имя' onChange={(e) => setInputData({ ...inputData, name: e.target.value })} />
                    <TextField className='Registration__name' error={!isCorrect.lastName} helperText={isCorrect.lastName ? false : 'Фамилия должна содержать минимум 2 буквы'} placeholder='Фамилия' onChange={(e) => setInputData({ ...inputData, lastName: e.target.value })} />
                    <TextField error={!isCorrect.bdate} onKeyUp={(e) => handleDate(e)} value={dateInput} placeholder='__/__/____' type="text" />
                </div>
            }
            <Button onClick={registerRequest}>Зарегистрироваться</Button>
            <div><Link to='/login'>Уже есть аккаунт?</Link></div>
        </div>
    );
}

export default Registration;