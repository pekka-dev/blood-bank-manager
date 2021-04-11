import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signOut() {
        return auth.signOut();
    }

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    const value = {
        currentUser,
        logIn,
        signUp,
        signOut,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
