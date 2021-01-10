import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import reducerUser from "./reducers/reducerUser";
import reducerWorlds from "./reducers/reducerWorlds";
import reducerBoard from "./reducers/reducerBoard";
import reducerVillage from "./reducers/reducerVillage";

const store = createStore(combineReducers({reducerUser, reducerWorlds, reducerBoard, reducerVillage}), applyMiddleware(thunk))

export default store