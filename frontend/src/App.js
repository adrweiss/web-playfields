import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import Game from './Game';
import Home from './Home'
import Login from './Login'
import Management from './Management'
import User from './User'
import NewUsr from './NewUsr'
import ResetPassword from './ResetPassword'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/game">
            <Header/>
            <Game/>
          </Route>
          <Route path="/login">
            <Header/>
            <Login/>
          </Route>
          <Route path="/management">
            <Header/>
            <Management/>
          </Route>
          <Route path="/user/newusr">
            <Header/>
            <NewUsr/>
          </Route>
          <Route path="/user/resetpw">
            <Header/>
            <ResetPassword/>
          </Route>
          <Route path="/user">
            <Header/>
            <User/>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;