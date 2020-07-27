import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../updateObject';

const initialState = {
    ride: null,
    error: null,
    loading: false
};


const fetchRideStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    })
};

const fetchRideFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
};

const fetchRideSuccess = (state, action) => {
    return updateObject(state, {
        ride: action.ride,
        loading: false
    })
};

// the reducer:
const rideReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RIDE_START: return fetchRideStart(state);
        case actionTypes.FETCH_RIDE_FAIL: return fetchRideFail(state, action);
        case actionTypes.FETCH_RIDE_SUCCESS: return fetchRideSuccess(state, action);
        default: return state;
    }
};

export default rideReducer;
