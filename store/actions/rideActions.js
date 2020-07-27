import * as actionTypes from "./actionTypes";
import axios from 'axios';
import {API_HTTP} from "../../config";

// single ride actions

export const fetchRideStart =() => {
    return {
        type: actionTypes.FETCH_RIDE_START,
        loading:true
    }
};

export const fetchRideFail =(error) => {
    return {
        type: actionTypes.FETCH_RIDE_FAIL,
        error: error,
        loading: false
    }
};

export const fetchRideSuccess = (ride) => {
    return {
        type: actionTypes.FETCH_RIDE_SUCCESS,
        ride: ride
    }
};


// async
export const fetchSingleRide = (pk) => {
    return dispatch => {
        dispatch(fetchRideStart());
        axios.get(API_HTTP+ 'api/'+ pk + '/')
            .then( response => {
                dispatch(fetchRideSuccess(response.data));
            }).catch( error => {
            dispatch(fetchRideFail(error));
        });
    }
};
