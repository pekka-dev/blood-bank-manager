import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
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

export default function LoadingButton({ title, loading }) {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
                {title}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}