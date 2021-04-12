import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Home() {
    const classes = useStyles();

    const history = useHistory();
    const { signOut, currentUser } = useAuth();

    async function handleSignOut(e) {
        e.preventDefault();
        await signOut();
        history.push('/login');
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xl">
                <Paper>{JSON.stringify(currentUser)}</Paper>
                <Button variant="contained" color="primary" onClick={handleSignOut}>
                    Sign Out
                </Button>
            </Container>
        </div>
    );
}
