import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SignUpError } from '../models';
import ErrorTextField from './ErrorTextField';
import LoadingButton from './LoadingButton';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    wrapper: {
        padding: theme.spacing(3, 0, 2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Red bank
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const classes = useStyles();

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(new SignUpError());
    const [loadingSignUp, setLoadingSingUp] = useState(false);
    const { signUp } = useAuth();
    const history = useHistory();

    async function handleSignUp(e) {
        e.preventDefault();

        const tempError = new SignUpError();
        let isError = false;
        if (!fName) {
            tempError.fNameError = true;
            isError = true;
        }
        if (!lName) {
            tempError.lNameError = true;
            isError = true;
        }
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
                if (tempError.hasOwnProperty(errorKey))
                    if (tempError[errorKey]) {
                        const id = errorKey.replace('Error', '');
                        document.getElementById(id).focus();
                        break;
                    }
            }
            return;
        }
        setLoadingSingUp(true);
        try {
            setError(new SignUpError());
            await signUp(email, password);
            history.push('/');
        } catch (e) {
            tempError.signUPError = true;
        }
        setLoadingSingUp(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={error.fNameError}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                value={fName}
                                onChange={(value) => {
                                    setFName(value.target.value);
                                }}
                                fullWidth
                                id="fName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={error.lNameError}
                                variant="outlined"
                                value={lName}
                                onChange={(value) => {
                                    setLName(value.target.value);
                                }}
                                fullWidth
                                id="lName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        {error.fNameError && error.lNameError ? (
                            <ErrorTextField description="Enter first name and surname" />
                        ) : error.fNameError ? (
                            <ErrorTextField description="Enter first name" />
                        ) : error.lNameError ? (
                            <ErrorTextField description="Enter last name" />
                        ) : null}
                        <Grid item xs={12}>
                            <TextField
                                error={error.emailError}
                                variant="outlined"
                                value={email}
                                onChange={(value) => {
                                    setEmail(value.target.value);
                                }}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        {error.emailError && (
                            <ErrorTextField description="Enter an email address" />
                        )}
                        <Grid item xs={12}>
                            <TextField
                                error={error.passwordError}
                                variant="outlined"
                                value={password}
                                onChange={(value) => {
                                    setPassword(value.target.value);
                                }}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        {error.emailError && <ErrorTextField description="Enter a password" />}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton title="Sign Up" loading={loadingSignUp} />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link variant="body2" component={RouterLink} to="/login">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
