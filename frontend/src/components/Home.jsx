import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
    const history = useHistory();
    const { signOut, currentUser } = useAuth();

    async function handleSignOut(e) {
        e.preventDefault();
        await signOut();
        history.push('/login');
    }

    return (
        <div>
            {currentUser.email1}
            <Button variant="contained" color="primary" onClick={handleSignOut}>
                Sign Out
            </Button>
        </div>
    );
}
