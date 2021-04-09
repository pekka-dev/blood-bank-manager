import React, {useState} from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function LoginForm() {
    const [signUp, setSignUp] = useState(false);
    return (<div>
        {signUp ? <SignUp signUp={setSignUp}/> : <SignIn signUp={setSignUp}/>}
    </div>)
}