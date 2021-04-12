import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import Home from './Home';
import SignUp from './auths/SignUp';
import LogIn from './auths/LogIn';
import ForgotPassword from './auths/ForgotPassword';
import { AuthProvider } from '../contexts/AuthContext';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: '#ffffff',
        },
    },
});

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={LogIn} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                    </Switch>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
