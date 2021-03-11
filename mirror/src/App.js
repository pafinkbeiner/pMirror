import './App.scss';
import Base from './Pages/Base';
import FirebaseTest from './Pages/FirebaseTest';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { fb } from './Helper/firebase';
import { useStoreState } from 'easy-peasy';
import Grid from './Pages/Grid/Grid';

const App = () => {

  const user = useStoreState(state => state.user);

  return (

      <Router>
        <button onClick={() => 
            fb.auth().signOut().then(() => {window.location.replace("/login")})
        }>Log Out</button>
        <br/><br/>
        <Switch>
          <Route path="/Login">
            <Login/>
          </Route>
          <Route path="/Register">
            <Register/>
          </Route>
          <Route path="/">
            {user ? 
              <Grid/>: 
              <Redirect to="/Login"/>
            }
          </Route>
        </Switch>
      </Router>

  );
};

export default App;
