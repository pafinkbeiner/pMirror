import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { fb } from "./Helper/firebase";
import { useStoreState } from "easy-peasy";
import Control from "./Pages/Control/Control";
import "./App.css";

function App() {
  const user = useStoreState((state) => state.user);

  return (
    <div className="App">
      <Router>

        <div style={{position: "absolute", left: "0px", top: "-10px"}}>
          <div className="column is-half"><h1 style={{fontSize: "2em"}}>Control</h1></div>
        </div>

        {user && (
          <button
            className="button"
            style={{ position: "absolute", right: "10px", top: "10px" }}
            onClick={() =>
              fb
                .auth()
                .signOut()
                .then(() => {
                  window.location.replace("/login");
                })
            }
          >
            Log Out
          </button>
        )}
        <br />
        <br />
        <Switch>
          <Route path="/Login"><Login/></Route>
          <Route path="/Register"><Register/></Route>
          <Route path="/">
          {user ? 
              <Control/>: 
              <Redirect to="/Login"/>
            }
          </Route>
        </Switch>

        <div style={{position: "absolute", bottom: "10px", left: "35%"}}><b>{user.email}</b></div>

      </Router>
    </div>
  );
}

export default App;
