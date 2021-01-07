import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logInAction, logOutAction} from "../actions/actionsUser";
import Home from "../components/Home";
import Login from "./Login";
import Navbar from "../components/Navbar";

const App = ({user, logIn, logOut}) => {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar user={user} logOut={logOut}/>
          <Switch>
            <Route exact path="/" render={() => <Home user={user}/>}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        user: state.reducerUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (name, email) => {
            return dispatch(logInAction(name, email))
        },
        logOut: () => {
            return dispatch(logOutAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);