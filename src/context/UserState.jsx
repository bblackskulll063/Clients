import { useEffect, useState } from 'react';
import { auth, GoogleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import UserContext from './UserContext';
export function UserState({ children }) {

    const [User, setUser] = useState("");

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const signupWithGoogle = () => {
        return signInWithPopup(auth, GoogleProvider);
    }

    useEffect(() => {
        const unsubscribe =
            onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                // localStorage.setItem("test",currentUser.uid)
            });
        return () => {
            unsubscribe();
        }
    }, [auth])


    return (
        <UserContext.Provider
            value={{ User, signup, signupWithGoogle, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};