import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";


import ridesReducer from "./reducers/ridesReducer";
import authReducer from "./reducers/authReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk, ];

const rootReducer = combineReducers({
    rides: ridesReducer,
    auth: authReducer,

});

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
));
