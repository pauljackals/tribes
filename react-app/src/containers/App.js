import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logOutAction} from "../actions/actionsUser";
import {clearBoardAction} from "../actions/actionsBoard";
import {logInOperation, registerOperation, joinWorldOperation} from "../operations/operationsUser";
import {fetchWorldsOperation, playWorldOperation} from "../operations/operationsWorlds";
import Home from "./Home";
import Login from "./login/Login";
import Navbar from "./Navbar";
import Register from "./register/Register";
import World from "./World";

const App = ({user, logOut, logIn, register, worlds, fetchWorlds, joinWorld, clearBoard, board, playWorld}) => {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar user={user} logOut={logOut}/>
          <Switch>
            <Route exact path="/" render={() =>
                <Home
                    user={user}
                    worlds={worlds}
                    fetchWorlds={fetchWorlds}
                    joinWorld={joinWorld}
                    clearBoard={clearBoard}
                />}
            />
            <Route path="/login" render={() =>
                <Login
                    logIn={logIn}
                    redirect={user.loggedIn}
                />}
            />
            <Route path="/register" render={() =>
                <Register
                    register={register}
                    redirect={user.loggedIn}
                />}
            />
            <Route exact path="/world/:id" render={props =>
                <World
                    id={props.match.params.id}
                    user={user}
                    worlds={worlds}
                    board={board}
                    playWorld={playWorld}
                />}
            />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        user: state.reducerUser,
        worlds: state.reducerWorlds,
        board: state.reducerBoard
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
        },
        fetchWorlds: async () => {
            return await fetchWorldsOperation()(dispatch)
        },
        joinWorld: async (idUser, idWorld) => {
            return await joinWorldOperation(idUser, idWorld)(dispatch)
        },
        clearBoard: () => {
            dispatch(clearBoardAction())
        },
        playWorld: idWorld => {
            dispatch(playWorldOperation(idWorld))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);