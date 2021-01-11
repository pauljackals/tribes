import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logOutAction} from "../actions/actionsUser";
import {clearBoardAction} from "../actions/actionsBoard";
import {logInOperation, registerOperation, joinWorldOperation} from "../operations/operationsUser";
import {fetchWorldsOperation, playWorldOperation} from "../operations/operationsWorlds";
import {getVillageDetailsOperation, patchVillageNameOperation} from "../operations/operationsVillage";
import {resetVillageAction} from "../actions/actionsVillage";
import Home from "./Home";
import Login from "./login/Login";
import Navbar from "./Navbar";
import Register from "./register/Register";
import World from "./world/World";
import VillageDetails from "./world/village/VillageDetails";

const App = ({user, logOut, logIn, register, worlds, fetchWorlds, joinWorld, clearBoard, board, playWorld, village, getVillageDetails, resetVillage, patchVillageName}) => {
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
                    resetVillage={resetVillage}
                />}
            />
              <Route exact path="/world/:idWorld/village/:id/details" render={props =>
                  <VillageDetails
                      id={props.match.params.id}
                      user={user}
                      village={village}
                      getVillageDetails={getVillageDetails}
                      patchVillageName={patchVillageName}
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
        board: state.reducerBoard,
        village: state.reducerVillage
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
        },
        getVillageDetails: idVillage => {
            dispatch(getVillageDetailsOperation(idVillage))
        },
        resetVillage: () => {
            dispatch(resetVillageAction())
        },
        patchVillageName: (idVillage, name) => {
            dispatch(patchVillageNameOperation(idVillage, name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);