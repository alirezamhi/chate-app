import React from 'react';
import {auth} from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';

// Components
import Navbar from './Navbar';

// Styles
import styles from "./Chats.module.css"

const Chats = () => {

    const history = useHistory();
    const logoutHandler= async () => {
        await auth.signOut();
        history.push('/');
    }

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler} />
            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="20e717da-328d-4880-a16b-d48d34a09af9"
                userName='.'
                userSecret='.'
            />
        </div>
    );
};

export default Chats;