import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LogoIcon from '../icons/LogoIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1, 0, 0),
    },
    logoTitle: {
        marginLeft: theme.spacing(2),
        color: '#FF1F3D',
    },
}));
export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item container xs={12} sm={6} spacing={2}>
                    <Grid item xs={2}>
                        <LogoIcon width={50} height={50} />
                    </Grid>
                    <Grid container item xs={10} alignItems="center">
                        <Typography variant="h4" className={classes.logoTitle}>
                            Red
                        </Typography>
                        <Typography variant="h4">bank</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
