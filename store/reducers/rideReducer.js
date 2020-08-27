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

const fetchMyRideStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    })
};

const fetchMyRideFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
};

const fetchMyRideSuccess = (state, action) => {
    return updateObject(state, {
        ride: action.ride,
        loading: false
    })
};

const updateMyRideStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    })
};

const updateMyRideFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
};

const updateMyRideSuccess = (state, action) => {
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

        case actionTypes.FETCH_MY_RIDE_START: return fetchMyRideStart(state);
        case actionTypes.FETCH_MY_RIDE_FAIL: return fetchMyRideFail(state, action);
        case actionTypes.FETCH_MY_RIDE_SUCCESS: return fetchMyRideSuccess(state, action);

        case actionTypes.UPDATE_MY_RIDE_START: return updateMyRideStart(state);
        case actionTypes.UPDATE_MY_RIDE_FAIL: return updateMyRideFail(state, action);
        case actionTypes.UPDATE_MY_RIDE_SUCCESS: return updateMyRideSuccess(state, action);
        default: return state;
    }
};

export default rideReducer;
