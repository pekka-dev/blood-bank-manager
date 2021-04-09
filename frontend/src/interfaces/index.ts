import React, {Reducer} from "react";

export interface loginState extends Reducer<any, any>{
    userId: string,
    isLoggedIn: string
}
export interface loginAction extends Reducer<any, any>{
    type: string,
    payload: any
}

export interface ContextValue {
    Context: React.Context<any>,
    Provider: React.ReactNode
}