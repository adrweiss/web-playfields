import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import Game from './Game/Game';
import Home from './Home/Home'
import Login from './User/Login'
import Management from './Management/Management'
import User from './User/User'
import NewUsr from './User/NewUsr'
import ForgottPassword from './User/ForgottPassword'
import ValidateUser from './User/ValidateUser'
import Unauthorized from './Unauthorized'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/game">
            <Header />
            <Game />
          </Route>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/management">
            <Header />
            <Management />
          </Route>
          <Route path="/user/register">
            <Header />
            <NewUsr />
          </Route>
          <Route path="/user/forgot">
            <Header />
            <ForgottPassword />
          </Route>
          <Route path="/user/validate">
            <Header />
            <ValidateUser />
          </Route>
          <Route path="/user">
            <Header />
            <User />
          </Route>
          <Route path="/unauthorized">
            <Header />
            <Unauthorized />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;