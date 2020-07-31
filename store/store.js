import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";


import ridesReducer from "./reducers/ridesReducer";
import authReducer from "./reducers/authReducer";
import rideReducer from "./reducers/rideReducer";
import webSocketReducer from "./reducers/webSocketReducer";
import webSocketsMiddleware from "../middleware/webSocketMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk, webSocketsMiddleware,];

const rootReducer = combineReducers({
    rides: ridesReducer,
    auth: authReducer,
    ride: rideReducer,
    webSocket: webSocketReducer,

});

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
));
