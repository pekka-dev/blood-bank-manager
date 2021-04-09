import CreateContext from './Context'
import {Dispatch, ReducerAction, ReducerState} from "react";
import {loginState, loginAction} from '../interfaces'

function reducer(state: ReducerState<loginState>, action: ReducerAction<loginAction>) {
    switch (action.type) {
        case "SIGN_IN": {
            return {userID: "prashant", isLoggedIn: true}
        }
        case "SIGN_UP": {
            return {userID: "prashant", isLoggedIn: true}
        }
        case "SIGN_OUT": {
            return {isLoggedIn: false}
        }
    }
}

function signIn(dispatch: Dispatch<any>) {
    return (email: string, password: string) => {
        dispatch({type: "SIGN_IN", payload: {email, password}})
    }
}

function signUp(dispatch: Dispatch<any>) {
    return (firstName: string, lastName: string, email: string, password: string) => {
        dispatch({
            type: "SIGN_UP", payload: {
                firstName, lastName, email, password
            }
        })
    }
}

function signOut(dispatch: Dispatch<any>) {
    return () => {
        dispatch({type: "SIGN_OUT"})
    }
}

const {Context, Provider} = CreateContext(reducer, [signIn, signUp, signOut], [])

export default {Context, Provider}
