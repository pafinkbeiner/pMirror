import React, { useState } from "react";
import { fb, db } from "../../Helper/firebase";
import { useStoreActions } from "easy-peasy";
import { Redirect } from "react-router-dom";

const Login = () => {
  const setUser = useStoreActions((actions) => actions.setUser);

  // Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Meta
  const [loading, setLoading] = useState();
  const [label, setLabel] = useState("");
  const [redirect, setRedirect] = useState(undefined);

  const onSubmit = (e) => {
    e.preventDefault();
    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setUser(user);

        //Setup firestore data
        const data = {};

        db.collection("users")
          .doc(`${user.uid}`)
          .set(data, { merge: true })
          .then(() => {
            setRedirect(true);
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
      });
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <div class="container">

        <div className="column">
          <p style={{fontSize: "2em"}}>Login</p>
        </div>

          <div className="column">

            <form onSubmit={onSubmit}>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    class="input"
                    type="email"
                    placeholder="Email input"
                  ></input>
                </div>
              </div>

              <br />

              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    class="input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Email input"
                  />
                </div>
              </div>

              <br />
              <br />
              <input className="button" type="submit" />
            </form>

            </div>

        </div>
      )}
    </>
  );
};

export default Login;
