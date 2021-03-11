import React, {useState} from 'react'
import {fb, db} from "../../Helper/firebase"
import { useStoreActions } from "easy-peasy"
import {Redirect} from "react-router-dom"

const Register = () => {

    const setUser = useStoreActions((actions) => actions.setUser);

    // Credentials
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Meta
    const [loading, setLoading] = useState();
    const [label, setLabel] = useState("")
    const [redirect, setRedirect] = useState(undefined)

    const onSubmit = (e) => {
        e.preventDefault();
        fb.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            setUser(user);

            //Setup firestore data
            const data = {
                grid: [],
                username: username,
                role: 1
              };
              
            db.collection('users').doc(`${user.uid}`).set(data)
            .then(() => {
                setRedirect(true)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
        });
    }
    
    return (
        <>
            {
                redirect ? 
                    <Redirect to="/"/>
                : 
            <div>
                <form  onSubmit={onSubmit}>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="username" name="username" id="username"/>
                    <label htmlFor="username">Username</label>
                    <br/>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email"/>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password"/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
            }
        </>
    )
}

export default Register
