import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logOutAction, userClearErrorsAction} from "../actions/actionsUser";
import {logInOperation, registerOperation, joinWorldOperation} from "../operations/operationsUser";
import {fetchWorldsOperation, playWorldOperation} from "../operations/operationsWorlds";
import {getVillageDetailsOperation, patchVillageNameOperation} from "../operations/operationsVillage.js";
import {getConversationsOperation} from "../operations/operationsConversations";
import Home from "./Home";
import Login from "./login/Login";
import Navbar from "./Navbar";
import Register from "./register/Register";
import World from "./world/World";
import VillageDetails from "./world/village/VillageDetails";
import Conversations from './world/conversations/Conversations'

const App = ({user, userErrors, userClearErrors, logOut, logIn, register, worlds, fetchWorlds, joinWorld, board, playWorld, village, getVillageDetails, patchVillageName, conversations, getConversations}) => {
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
                />}
            />
            <Route path="/login" render={() =>
                <Login
                    logIn={logIn}
                    userErrors={userErrors}
                    userClearErrors={userClearErrors}
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
              <Route exact path="/world/:idWorld/village/:id/details" render={props =>
                  <VillageDetails
                      id={props.match.params.id}
                      user={user}
                      village={village}
                      getVillageDetails={getVillageDetails}
                      patchVillageName={patchVillageName}
                  />}
              />
              <Route exact path="/world/:idWorld/conversations" render={props =>
                  <Conversations
                      user={user}
                      idWorld={props.match.params.idWorld}
                      conversations={conversations}
                      getConversations={getConversations}
                      worlds={worlds}
                  />}
              />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        user: state.reducerUser.user,
        userErrors: state.reducerUser.errors,
        worlds: state.reducerWorlds,
        board: state.reducerBoard,
        village: state.reducerVillage,
        conversations: state.reducerConversations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(logOutAction())
        },
        userClearErrors: () => {
            dispatch(userClearErrorsAction())
        },
        logIn: email => {
            dispatch(logInOperation(email))
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
        playWorld: idWorld => {
            dispatch(playWorldOperation(idWorld))
        },
        getVillageDetails: idVillage => {
            dispatch(getVillageDetailsOperation(idVillage))
        },
        patchVillageName: (idVillage, name) => {
            dispatch(patchVillageNameOperation(idVillage, name))
        },
        getConversations: (idUser, idWorld) => {
            dispatch(getConversationsOperation(idUser, idWorld))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);