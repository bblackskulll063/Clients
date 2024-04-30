// SignIn.js
import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { auth } from '../config/firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const context = useContext(UserContext);
    const { signup, signupWithGoogle, User } = context;


    const SignInWithManually = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
            sendSignInLinkToEmail(auth);
            const userid = (auth?.currentUser?.uid);

            localStorage.setItem("user", userid);
            navigate('/home')
            toast.success("Signup Successfully");

        } catch (error) {
            toast.error(error.message);
        }
    };


    const clickforSignInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            await signupWithGoogle();

            const userid = (auth?.currentUser?.uid);
            localStorage.setItem("user", userid);
            navigate('/home');
            toast.success("Signup Successfully");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='container login-page'>
            <div className="detail-section">
                <h1>Sign In</h1>
                <div className='box'>
                    <MdEmail size={30} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className='box'>
                    <RiLockPasswordFill size={30} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <div className='d-flex my-4'>
                    <button onClick={SignInWithManually} className='btn btn-primary mx-3 w-25 '>Sign In</button>
                    <GoogleButton
                        onClick={clickforSignInWithGoogle} />
                </div>

            </div>
        </div>
    );
};

export default Signup;
