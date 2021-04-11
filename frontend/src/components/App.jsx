import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
