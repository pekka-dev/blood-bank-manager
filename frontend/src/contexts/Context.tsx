import React, {useReducer, createContext, Reducer} from "react";
import {loginAction, loginState, ContextValue} from "../interfaces";


const CreateContext = (reducer: Reducer<any, any>, actions: any, initialState: any): ContextValue => {
    const Context = createContext({});

    const Provider = ({children}: any) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions: any = [];

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }

        return (
            <Context.Provider value={{state, ...boundActions}}>
                {children}
            </Context.Provider>
        )
    }

    return {Context, Provider}
}

export default CreateContext
