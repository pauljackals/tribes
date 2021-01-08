import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logOutAction} from "../actions/actionsUser";
import {logInOperation} from "../operations/operationsUser";
import Home from "../components/Home";
import Login from "./Login";
import Navbar from "../components/Navbar";

const App = ({user, logOut, logIn}) => {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar user={user} logOut={logOut}/>
          <Switch>
            <Route exact path="/" render={() => <Home user={user}/>}/>
            <Route exact path="/login" render={() => <Login logIn={logIn}/>}/>
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
        logOut: () => {
            dispatch(logOutAction())
        },
        logIn: email => {
            dispatch(logInOperation(email))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);