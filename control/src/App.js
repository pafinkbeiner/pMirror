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

function App() {
  const user = useStoreState((state) => state.user);

  return (
    <div className="App">
      <Router>
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
              <></>: 
              <Redirect to="/Login"/>
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
