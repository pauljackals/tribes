import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import reducerUser from "./reducers/reducerUser";

const store = createStore(combineReducers({reducerUser}), applyMiddleware(thunk))

export default store