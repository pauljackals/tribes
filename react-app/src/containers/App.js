import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logOutAction, userClearErrorsAction} from "../actions/actionsUser";
import {logInOperation, registerOperation, joinWorldOperation, leaveWorldOperation, editProfileOperation, deleteUserOperation, adminOperation} from "../operations/operationsUser";
import {fetchWorldsOperation, createWorldsOperation, deleteWorldsOperation} from "../operations/operationsWorlds";
import {playWorldOperation} from "../operations/operationsWorld";
import {getVillageDetailsOperation, patchVillageNameOperation} from "../operations/operationsVillage.js";
import {getConversationsOperation, sendMessageOperation, deleteMessageOperation, updateMessageOperation, inviteUserOperation, kickUserOperation, editTitleOperation, createConversationOperation, deleteConversationOperation} from "../operations/operationsConversations";
import Home from "./Home";
import Login from "./login/Login";
import Navbar from "./Navbar";
import Register from "./register/Register";
import World from "./world/World";
import VillageDetails from "./world/village/VillageDetails";
import Conversations from './world/conversations/Conversations'
import Conversation from "./world/conversations/Conversation";
import Profile from "./profile/Profile";

const App = ({user, userErrors, userClearErrors, logOut, logIn, register, worlds, world, fetchWorlds, joinWorld, board, playWorld, village, getVillageDetails, patchVillageName, conversations, getConversations, sendMessage, deleteMessage, updateMessage, inviteUser, kickUser, editTitle, createConversation, deleteConversation, createWorlds, deleteWorlds, leaveWorld, editProfile, deleteUser, admin}) => {
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
                    createWorlds={createWorlds}
                    deleteWorlds={deleteWorlds}
                    admin={admin}
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
              <Route path="/profile" render={props =>
                  <Profile
                      user={user}
                      location={props.location}
                      userClearErrors={userClearErrors}
                      userErrors={userErrors}
                      editProfile={editProfile}
                      deleteUser={deleteUser}
                  />}
              />
            <Route path="/register" render={() =>
                <Register
                    register={register}
                    userErrors={userErrors}
                    userClearErrors={userClearErrors}
                    redirect={user.loggedIn}
                />}
            />
            <Route exact path="/world/:id" render={props =>
                <World
                    id={props.match.params.id}
                    user={user}
                    world={world}
                    board={board}
                    playWorld={playWorld}
                    leaveWorld={leaveWorld}
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
              <Route exact path="/world/:idWorld/conversations/:id" render={props =>
                  <Conversation
                      user={user}
                      id={props.match.params.id}
                      conversations={conversations}
                      sendMessage={sendMessage}
                      deleteMessage={deleteMessage}
                      updateMessage={updateMessage}
                      world={world}
                      inviteUser={inviteUser}
                      kickUser={kickUser}
                      editTitle={editTitle}
                      deleteConversation={deleteConversation}
                  />}
              />
              <Route exact path="/world/:idWorld/conversations" render={props =>
                  <Conversations
                      user={user}
                      idWorld={props.match.params.idWorld}
                      conversations={conversations}
                      getConversations={getConversations}
                      world={world}
                      createConversation={createConversation}
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
        world: state.reducerWorld,
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
        register: (name, email) => {
            dispatch(registerOperation(name, email))
        },
        fetchWorlds: () => {
            dispatch(fetchWorldsOperation())
        },
        joinWorld: (idUser, idWorld) => {
            dispatch(joinWorldOperation(idUser, idWorld))
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
        },
        sendMessage: (idUser, idConversation, content, time) => {
            dispatch(sendMessageOperation(idUser, idConversation, content, time))
        },
        deleteMessage: id => {
            dispatch(deleteMessageOperation(id))
        },
        updateMessage: (id, content) => {
            dispatch(updateMessageOperation(id, content))
        },
        inviteUser: (idConversation, idUser) => {
            dispatch(inviteUserOperation(idConversation, idUser))
        },
        kickUser: (idConversation, idUser) => {
            dispatch(kickUserOperation(idConversation, idUser))
        },
        editTitle: (id, title) => {
            dispatch(editTitleOperation(id, title))
        },
        createConversation: (idWorld, idsUsers, title) => {
            dispatch(createConversationOperation(idWorld, idsUsers, title))
        },
        deleteConversation: id => {
            dispatch(deleteConversationOperation(id))
        },
        createWorlds: (id, size) => {
            dispatch(createWorldsOperation(id, size))
        },
        deleteWorlds: id => {
            dispatch(deleteWorldsOperation(id))
        },
        leaveWorld: (idUser, idWorld) => {
            dispatch(leaveWorldOperation(idUser, idWorld))
        },
        editProfile: (id, name, email) => {
            dispatch(editProfileOperation(id, name, email))
        },
        deleteUser: id => {
            dispatch(deleteUserOperation(id))
        },
        admin: (name, admin) => {
            dispatch(adminOperation(name, admin))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);