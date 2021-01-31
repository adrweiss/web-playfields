import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import Footer from './Footer'
import Game from './Game/Game';
import Home from './Home/Home'
import Management from './Management/Management'
import Login from './User/Login'
import User from './User/User'
import NewUsr from './User/NewUsr'
import ForgottPassword from './User/ForgottPassword'
import ValidateUser from './User/ValidateUser'
import Unauthorized from './Main/Unauthorized'
import Impressum from './Main/Impressum'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/game">
            <Header />
            <Game />
            <Footer />
          </Route>
          <Route path="/login">
            <Header />
            <Login />
            <Footer />
          </Route>
          <Route path="/management">
            <Header />
            <Management />
            <Footer />
          </Route>
          <Route path="/user/register">
            <Header />
            <NewUsr />
            <Footer />
          </Route>
          <Route path="/user/forgott">
            <Header />
            <ForgottPassword />
            <Footer />
          </Route>
          <Route path="/user/validate">
            <Header />
            <ValidateUser />
            <Footer />
          </Route>
          <Route path="/user">
            <Header />
            <User />
            <Footer />
          </Route>
          <Route path="/unauthorized">
            <Header />
            <Unauthorized />
            <Footer />
          </Route>
          <Route path="/impressum">
            <Header />
            <Impressum />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;