import {createStore, combineReducers} from "redux";
import reducerUser from "./reducers/reducerUser";

const store = createStore(combineReducers({reducerUser}))

export default store