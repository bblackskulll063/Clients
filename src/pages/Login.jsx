import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'
import { auth } from '../config/firebase';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {  toast } from 'react-toastify';

const initialeState = {    
    email: '',
    password: '',
};

const Login = () => {
    const [credentials, setcredentials] = useState(initialeState);
    const {email, password} = credentials;
    const navigate = useNavigate();

    const context = useContext(UserContext);
    const { login, signupWithGoogle} = context;

    const handleOnChange = (e) => {
        setcredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const clickforLogIn = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            const userid = (auth?.currentUser?.uid);
            localStorage.setItem("user", userid);
            navigate('/home')
            toast.success("you are login");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const clickforLoginWithGoogle = async (e) => {
        e.preventDefault();
        try {
            await signupWithGoogle()
            const userid = (auth?.currentUser?.uid);
            localStorage.setItem("user", userid);
            navigate('/home')
            toast.success("you are login");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='container login-page'>
            <div className="detail-section">
                <h1>Log In</h1>
                <div className="box">
                    <MdEmail size={30} />
                    <input type="email" name='email' value={email} onChange={handleOnChange} placeholder="Email" required />
                </div>
                <div className="box">
                    <RiLockPasswordFill size={30} />
                    <input type="password" name='password' value={password} onChange={handleOnChange} placeholder="Password" required />
                </div>
                <div className='d-flex my-4'>
                    <button onClick={clickforLogIn} className='btn btn-primary mx-3 w-25 '>Log In</button>
                    <GoogleButton
                        onClick={clickforLoginWithGoogle} label='Log In with Google' />
                </div>
            </div>


        </div>
    )
}

export default Login