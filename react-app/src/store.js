import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import reducerUser from "./reducers/reducerUser";
import reducerWorlds from "./reducers/reducerWorlds";
import reducerBoard from "./reducers/reducerBoard";
import reducerVillage from "./reducers/reducerVillage";
import reducerConversations from "./reducers/reducerConversations";
import {createMiddleware} from "redux-api-middleware";

const store = createStore(combineReducers({
    reducerUser,
    reducerWorlds,
    reducerBoard,
    reducerVillage,
    reducerConversations
}), applyMiddleware(thunk, createMiddleware()))

export default store