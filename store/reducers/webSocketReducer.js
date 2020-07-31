import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../updateObject';

const initialState = {
    host: null,
    error: null,
    loading: null
};

const webSocketReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.WS_CONNECT_START:
            return updateObject( state, {
                error: null,
                loading: true
            });
        case actionTypes.WS_CONNECT_FAIL:
            return updateObject( state, {
                error: action.error,
                loading: false
            });
        case actionTypes.WS_CONNECT_SUCCESS:
            return updateObject( state, {
                loading: false,
                host: action.host
            });

        case actionTypes.WS_DISCONNECT:
            return updateObject( state, {
                host: null
            });
        default:
            return state;
    }
};

export default webSocketReducer;
