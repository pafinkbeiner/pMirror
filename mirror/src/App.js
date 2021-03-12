import './App.scss';
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
import View1 from './Components/View1/View1';

const App = () => {

  const user = useStoreState(state => state.user);

  return (

      <Router>
        {user && 
            <button className="button" style={{position: "absolute", right: "10px", top: "10px"}} onClick={() => 
              fb.auth().signOut().then(() => {window.location.replace("/login")})
          }>Log Out</button>
        }
        <br/><br/>
        <Switch>
          <Route path="/View1" component={View1} />
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
