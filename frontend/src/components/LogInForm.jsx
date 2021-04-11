import React, { useState } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';

export default function LoginForm() {
    const [signUp, setSignUp] = useState(false);
    return <div>{signUp ? <SignUp signUp={setSignUp} /> : <LogIn signUp={setSignUp} />}</div>;
}
