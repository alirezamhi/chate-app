import React , {useContext,useEffect,useState} from 'react';
import {auth} from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';

// Components
import Navbar from './Navbar';
//context
import {AuthContext} from '../contexts/AuthContextProvider';

// Styles
import styles from "./Chats.module.css"
import axios from 'axios';

const Chats = () => {

    const [loading,setLoading]=useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler= async () => {
        await auth.signOut();
        history.push('/');
    }

    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }

        axios.get("https://api.chatengine.io/users/me",{
            headers : {
                "project-id":"20e717da-328d-4880-a16b-d48d34a09af9",
                "user-name":user.email,
                "user-secret":user.uid
            }
        })
        .then(()=>{
            setLoading(false)
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append("email",user.email);
            formdata.append("username",user.email);
            formdata.append("secret",user.uid);
            getfile(user.photoURL)
                .then(avatar => {
                    formdata.append("avatar",avatar,avatar.name)
                    axios.post("https://api.chatengine.io/users/",formdata,{
                        headers:{
                            "private-key":"8741ea39-1dbd-41e6-8cac-e74877924014"
                        }
                    })
                    .then(()=>setLoading(false))
                    .catch(error=>console.log(error))
                })
        })
      
        
    },[user,history])

    const getfile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data],"userPhoto.jpg" , {type:"image/jpeg"})
    }
    if(!user || loading) return "loading..."
    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler} />
            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="20e717da-328d-4880-a16b-d48d34a09af9"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;