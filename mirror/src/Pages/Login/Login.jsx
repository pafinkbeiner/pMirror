import React, {useState} from 'react'
import {fb} from "../../Helper/firebase"

const Login = () => {
    
    // Credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Meta
    const [loading, setLoading] = useState();
    const [label, setLabel] = useState("")

    const onSubmit = (e) => {
        e.preventDefault();
        fb.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          window.location.replace("/")
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
    
    return (
        <div>
            <form  onSubmit={onSubmit}>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email"/>
                <label htmlFor="email">Email</label>
                <br/>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password"/>
                <label htmlFor="password">Password</label>
                <br/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login
