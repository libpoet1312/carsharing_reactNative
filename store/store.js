import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";
import { Provider, } from 'react-redux';


import ridesReducer from "./reducers/ridesReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk, ];

const rootReducer = combineReducers({
    rides: ridesReducer
});

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
));
