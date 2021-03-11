import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

/* Reducers */

import userReducer from "./reducers/user.reducer.js";

const rootReducer = combineReducers({
	user: userReducer
});

/* Store */

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;