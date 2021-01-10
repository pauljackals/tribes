import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import reducerUser from "./reducers/reducerUser";
import reducerWorlds from "./reducers/reducerWorlds";
import reducerBoard from "./reducers/reducerBoard";

const store = createStore(combineReducers({reducerUser, reducerWorlds, reducerBoard}), applyMiddleware(thunk))

export default store