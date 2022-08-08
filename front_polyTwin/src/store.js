import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //import index.js


const middleware = [thunk];

//Create store to globalized state
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;

/* Store:
    -> message
    -> auth
    ApplyMiddleware : to dispatching an action
 */