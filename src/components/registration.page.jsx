import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { UserActions } from "../redux/reducers/user.reducer";
import { useDispatch } from "react-redux";

function Registration(props) {

    //redux
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(
            UserActions.replaceProfile({ username: "MichaleShumsky" })
        );
        dispatch(
            UserActions.changeLogged(true)
        );
    };

    //vars and states
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoginWrong, setIsLoginWrong] = useState(false);
    const [isPasswordSafe, setIsPasswordSafe] = useState(true);

    const [isName, setIsName] = useState(true);
    const [isSurname, setIsSurname] = useState(true);
    const [isAge, setIsAge] = useState(true);

    const isLogAndPasswordEntered = isPasswordSafe && !isLoginWrong && passwordValue !== '' && loginValue !== '';

    //regular exp.
    let emailRegExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    let phoneNumberRegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    let nameRegExp = /^[\wА-Яа-я]{2,20}$/i;
    let ageRegExp = /^\d{2}$/;

    //useEffects and funcs
    useEffect(() => {
        passwordValue.length >= 8 || passwordValue === '' ? setIsPasswordSafe(true) : setIsPasswordSafe(false);
    }, [passwordValue])

    useEffect(() => {
        const isEmail = emailRegExp.test(loginValue);
        const isNumber = phoneNumberRegExp.test(loginValue) && loginValue.length > 10;

        if (!(isEmail || isNumber || loginValue === '')) {
            setIsLoginWrong(true);
        } else { setIsLoginWrong(false) }
    }, [loginValue])

    const isValueCorrect = (value, regExp, inputState) => {
        const isCorrect = regExp.test(value);
        console.log(value)
        if (!isCorrect && value !== '') {
            inputState(false)
        } else { inputState(true) }
    }

    //render
    return (
        <div>
            <p>Регистрация</p>

            <input type="email" value={loginValue} onChange={(e) => setLoginValue(e.target.value)} type='text' placeholder='email or number' />
            {isLoginWrong && <div>Please, enter a correct email or number</div>}
            <input value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} type='password' placeholder='password' />
            { !isPasswordSafe && <div>Password should include 8 signs min </div>}
            { isLogAndPasswordEntered &&
                <div>
                    <input placeholder='имя' onChange={(e) => isValueCorrect(e.target.value, nameRegExp, setIsName)} />
                    {!isName && <div>Enter a correct name</div>}
                    <input placeholder='фамилия' onChange={(e) => isValueCorrect(e.target.value, nameRegExp, setIsSurname)} />
                    {!isSurname && <div>Enter a correct surname</div>}
                    <input placeholder='возраст' onChange={(e) => isValueCorrect(e.target.value, ageRegExp, setIsAge)} />
                    {!isAge && <div>Enter a correct age</div>}

                </div>
            }

            <div onClick={handleClick}>Зарегистрироваться</div>
            <div><Link to='/login'>Уже есть аккаунт?</Link></div>

        </div>
    );
}

export default Registration;