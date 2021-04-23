import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    const googleSignInProvider = new firebase.auth.GoogleAuthProvider();

    function signInWithGoogle() {
        return auth.signInWithPopup(googleSignInProvider);
    }

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
            setLoading(false);
        });
    }, []);

    const value = {
        currentUser,
        logIn,
        signUp,
        signOut,
        signInWithGoogle,
    };
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
