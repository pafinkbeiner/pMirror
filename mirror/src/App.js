import './App.scss';
import Base from './Pages/Base';
import FirebaseTest from './Pages/FirebaseTest';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Notify from './Components/Notify';
import { fb } from './Helper/firebase';

const App = () => {
  return (
    <Router>
      <button onClick={() => 
          fb.auth().signOut().then(() => {window.location.replace("/login")})
      }>Log Out</button>
      <Switch>
        <Route exact path="/">
          <div>
            <FirebaseTest>
              <Base color="black" />
              <Base color="red" />
              <Base color="green" />
              <Base color="blue" />
            </FirebaseTest>
          </div>
        </Route>
        <Route path="/Login">
          <Login/>
        </Route>
        <Route path="/Register">
          <Register/>
        </Route>
        <Route path="/Notify">
          <Notify/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
