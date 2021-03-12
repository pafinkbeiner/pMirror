import React, { useState } from "react";
import { fb, db } from "../../Helper/firebase";
import { useStoreActions } from "easy-peasy";
import { Link, Redirect } from "react-router-dom";

const Register = () => {
  const setUser = useStoreActions((actions) => actions.setUser);

  // Credentials
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Meta
  const [loading, setLoading] = useState();
  const [label, setLabel] = useState("");
  const [redirect, setRedirect] = useState(undefined);

  const onSubmit = (e) => {
    e.preventDefault();
    fb.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setUser(user);

        //Setup firestore data
        const data = {
          grid: [],
          username: username,
          role: 1,
          orientation: "vertical",
        };

        db.collection("users")
          .doc(`${user.uid}`)
          .set(data)
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
        console.log(error);
      });
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <div className="container">
          <div className="column">
            <p style={{ fontSize: "2em" }}>Register</p>
            or go to the <Link to="/Login">Login</Link> page.
          </div>

          <div className="column">
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="username"
                  />
                </div>
              </div>

              <br />

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                  />
                </div>
              </div>

              <br />

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                  />
                </div>
              </div>

              <br />
              <input className="button" type="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
