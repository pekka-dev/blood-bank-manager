import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogInError } from '../../models';
import ErrorTextField from '../ErrorTextField';
import LoadingButton from '../LoadingButton';
import Copyright from '../Copyright';
import Logo from '../../logo';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
}));

export default function LogIn() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(new LogInError());
    const [loadingLogIn, setLoadingLogIn] = useState(false);
    const { logIn } = useAuth();
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        const tempError = new LogInError();
        let isError = false;
        if (!email) {
            tempError.emailError = true;
            isError = true;
        }
        if (!password) {
            tempError.passwordError = true;
            isError = true;
        }
        if (isError) {
            setError(tempError);
            for (const errorKey in tempError) {
                // eslint-disable-next-line no-prototype-builtins
                if (tempError.hasOwnProperty(errorKey))
                    if (tempError[errorKey]) {
                        const id = errorKey.replace('Error', '');
                        document.getElementById(id).focus();
                        break;
                    }
            }
            return;
        }
        setLoadingLogIn(true);
        try {
            setError(new LogInError());
            await logIn(email, password);
            history.push('/');
        } catch (e) {
            setError(tempError);
        }
        setLoadingLogIn(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Logo />
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleLogin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={error.emailError}
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={({ target: { value } }) => setEmail(value)}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>

                        {error.emailError && (
                            <ErrorTextField description="Enter an email address" />
                        )}
                        <Grid item xs={12}>
                            <TextField
                                error={error.passwordError}
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={({ target: { value } }) => setPassword(value)}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>

                        {error.passwordError && (
                            <ErrorTextField description="Enter your password" />
                        )}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                    </Grid>

                    <LoadingButton title="Log In" loading={loadingLogIn} />
                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2" component={RouterLink} to="/forgot-password">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2" component={RouterLink} to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
