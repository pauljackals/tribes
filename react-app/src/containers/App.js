import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logOutAction} from "../actions/actionsUser";
import {logInOperation, registerOperation} from "../operations/operationsUser";
import Home from "../components/Home";
import Login from "./login/Login";
import Navbar from "./Navbar";
import Register from "./register/Register";

const App = ({user, logOut, logIn, register}) => {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar user={user} logOut={logOut}/>
          <Switch>
            <Route exact path="/" render={() => <Home user={user}/>}/>
            <Route path="/login" render={() => <Login logIn={logIn} redirect={user.loggedIn}/>}/>
            <Route path="/register" render={() => <Register register={register} redirect={user.loggedIn}/>}/>
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
        logIn: async email => {
            return await logInOperation(email)(dispatch)
        },
        register: async (name, email) => {
            return await registerOperation(name, email)(dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);