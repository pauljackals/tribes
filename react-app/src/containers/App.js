import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {userClearErrorsAction} from "../actions/actionsUser";
import Home from "./Home";
import Login from "./login/Login";
import Navbar from "./Navbar";
import Register from "./register/Register";
import World from "./world/World";
import VillageDetails from "./world/village/VillageDetails";
import Conversations from './world/conversations/Conversations'
import Conversation from "./world/conversations/Conversation";
import Profile from "./profile/Profile";
import '../styles/App.css'

const App = ({user, userErrors, userClearErrors, world, conversations}) => {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar user={user}/>
          <Switch>
            <Route exact path="/" render={() =>
                <Home user={user}/>}
            />
            <Route path="/login" render={() =>
                <Login
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
                  />}
              />
            <Route path="/register" render={() =>
                <Register
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
                />}
            />
              <Route exact path="/world/:idWorld/village/:id/details" render={props =>
                  <VillageDetails
                      id={props.match.params.id}
                      user={user}
                  />}
              />
              <Route exact path="/world/:idWorld/conversations/:id" render={props =>
                  <Conversation
                      user={user}
                      id={props.match.params.id}
                      conversations={conversations}
                      world={world}
                  />}
              />
              <Route exact path="/world/:idWorld/conversations" render={props =>
                  <Conversations
                      user={user}
                      idWorld={props.match.params.idWorld}
                      conversations={conversations}
                      world={world}
                  />}
              />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        user: state.reducerUser.user,
        userErrors: state.reducerUser.errors,
        world: state.reducerWorld,
        conversations: state.reducerConversations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userClearErrors: () => {
            dispatch(userClearErrorsAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);