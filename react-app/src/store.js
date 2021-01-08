import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import reducerUser from "./reducers/reducerUser";
import reducerWorlds from "./reducers/reducerWorlds";

const store = createStore(combineReducers({reducerUser, reducerWorlds}), applyMiddleware(thunk))

export default store