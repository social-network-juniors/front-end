import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { UserActions } from "../redux/reducers/user.reducer";
import { useDispatch } from "react-redux";
import { registration } from '../api/rest/registration'
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
    const [userData, setUserData] = useState({
        login: null,
        password: null,
        passwordConfirmation: null,
        name: null,
        lastName: null,
        bday: null,
        bmonth: null,
        byear: null,
    });

    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoginWrong, setIsLoginWrong] = useState(false);
    const [isPasswordSafe, setIsPasswordSafe] = useState(true);

    const [isName, setIsName] = useState(true);
    const [isLastName, setIsLastName] = useState(true);
    const [isBDate, setIsBDate] = useState(true);
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false)

    const isLogAndPasswordEntered = isPasswordSafe && !isLoginWrong && passwordValue !== '' && loginValue !== '';

    //regular exp.
    let emailRegExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    let phoneNumberRegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    let nameRegExp = /^[\wА-Яа-я]{2,20}$/i;
    let bDateRegExp = /^\d{1,2}\.\d{1,2}\.\d{4}$/;

    //useEffects and funcs
    useEffect(() => {
        if (passwordValue.length >= 8 || passwordValue === '') {
            setIsPasswordSafe(true);
            setUserData((userData) => ({ ...userData, password: passwordValue }));
        } else { setIsPasswordSafe(false) }
    }, [passwordValue])

    useEffect(() => {
        const isEmail = emailRegExp.test(loginValue);
        const isNumber = phoneNumberRegExp.test(loginValue) && loginValue.length > 10;

        if (!(isEmail || isNumber || loginValue === '')) {
            setIsLoginWrong(true);
        } else {
            setIsLoginWrong(false);
            setUserData((userData) => ({ ...userData, login: loginValue }));

        }

    }, [loginValue])

    useEffect(() => {
        if (passwordValue === passwordConfirmation) {
            setIsPasswordConfirmed(true);
            setUserData((userData) => ({ ...userData, passwordConfirmation: passwordConfirmation }));
        } else if (passwordConfirmation !== '') {
            setIsPasswordConfirmed(false)
        }

    }, [passwordValue, passwordConfirmation])

    const isValueCorrect = (dataType, value, regExp, inputState) => {
        const isCorrect = regExp.test(value);
        if (!isCorrect && value !== '') {
            inputState(false)

        } else {
            inputState(true)
            setUserData((userData) => ({ ...userData, [dataType]: value }));

        }
    }
    const bDateHandler = (value) => {
        const isFormatCorrect = bDateRegExp.test(value);
        const littleMonths = [2, 4, 6, 9, 11];
        if (!isFormatCorrect) { setIsBDate(false) }
        else {
            let dateArr = value.split('.');
            let year = dateArr[2];
            let month = dateArr[1];
            let day = dateArr[0];

            setIsBDate(true);

            if (year >= 2006 || year <= 1900) { setIsBDate(false); }
            if (month > 12 || month <= 0) { setIsBDate(false); }
            if (day > 31 || day <= 0) { setIsBDate(false); }
            if (littleMonths.includes(month) && day === 31) { setIsBDate(false); }
            if (month == 2 && day >= 30) { setIsBDate(false); }
            if (year % 4 !== 0 && month == 2 && day == 29) { setIsBDate(false); }

            setUserData((userData) => ({ ...userData, bday: day, bmonth: month, byear: year }));
        }
    }
    const registerRequest = () => {
        let isDataEntered = userData.login && userData.password && userData.passwordConfirmation && userData.name && userData.lastName && userData.byear;
        if (isDataEntered) {
            registration(userData.login, userData.password, userData.passwordConfirmation, userData.name, userData.lastName, userData.bday, userData.bmonth, userData.byear);
        } else {
            console.log(userData);
        };
    }




    //render
    return (
        <div>
            <p>Регистрация</p>
            <input type="email" value={loginValue} onChange={(e) => setLoginValue(e.target.value)} type='text' placeholder='email or number' />
            {isLoginWrong && <div>Please, enter a correct email or number</div>}
            <input value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} type='password' placeholder='password' />
            { !isPasswordSafe && <div>Password should include 8 signs min </div>}
            <input onChange={(e) => setPasswordConfirmation(e.target.value)} type='password' placeholder='Confirm password' />
            { !isPasswordConfirmed && <div>Passwords are different</div>}

            { isLogAndPasswordEntered &&
                <div>
                    <input placeholder='имя' onChange={(e) => isValueCorrect('name', e.target.value, nameRegExp, setIsName)} />
                    {!isName && <div>Enter a correct name</div>}
                    <input placeholder='фамилия' onChange={(e) => isValueCorrect('lastName', e.target.value, nameRegExp, setIsLastName)} />
                    {!isLastName && <div>Enter a correct surname</div>}
                    {/* <input placeholder='dd.mm.yyyy' onChange={(e) => isValueCorrect('age', e.target.value, ageRegExp, setIsAge)} /> */}
                    <input placeholder='dd.mm.yyyy' onChange={(e) => bDateHandler(e.target.value)} />
                    {!isBDate && <div>Enter a correct age</div>}

                </div>
            }

            <div onClick={registerRequest}>Зарегистрироваться</div>
            <div><Link to='/login'>Уже есть аккаунт?</Link></div>

        </div>
    );
}

export default Registration;