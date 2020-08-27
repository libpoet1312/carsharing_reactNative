import * as actionTypes from './actionTypes';
import axios from 'axios';
import {API_HTTP} from "../../config";


// my rides actions
export const fetchMyRidesStart =() => {
    return {
        type: actionTypes.FETCH_MY_RIDES_START
    }
};

export const fetchMyRidesFail =(error) => {
    return {
        type: actionTypes.FETCH_MY_RIDES_FAIL,
        error: error
    }
};

export const fetchMyRidesSuccess =(rides) => {
    return {
        type: actionTypes.FETCH_MY_RIDES_SUCCESS,
        rides: rides
    }
};

// my ride actions
export const fetchMyRideStart =() => {
    return {
        type: actionTypes.FETCH_MY_RIDE_START
    }
};

export const fetchMyRideFail =(error) => {
    return {
        type: actionTypes.FETCH_MY_RIDE_FAIL,
        error: error
    }
};


export const fetchMyRideSuccess =(ride) => {
    return {
        type: actionTypes.FETCH_MY_RIDE_SUCCESS,
        ride: ride
    }
};

export const updateMyRideStart = () => {
    return {
        type: actionTypes.UPDATE_MY_RIDE_START
    }
};

export const updateMyRideFail = error => {
    return {
        type: actionTypes.UPDATE_MY_RIDE_FAIL,
        error
    }
};

export const updateMyRideSuccess = ride => {
    return {
        type: actionTypes.UPDATE_MY_RIDE_SUCCESS,
        ride
    }
};

export const deleteMyRideStart = () => {
    return {
        type: actionTypes.DELETE_MY_RIDE_START
    }
};

export const deleteMyRideFail = error => {
    return {
        type: actionTypes.DELETE_MY_RIDE_FAIL,
        error: error
    }
};

export const deleteMyRideSuccess = () => {
    return {
        type: actionTypes.DELETE_MY_RIDE_SUCCESS,
    }
};




// async
export const fetchMyRides = (query, token) => {
    return dispatch => {
        dispatch(fetchMyRidesStart());
        if(query!==''){
            // console.log('edw', query);
            query = '?'+query;
        }
        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ token
            }
        };
        axios.get(API_HTTP + 'api/myrides/'+ query, config)
            .then( (response) => {
                // console.log(response.data);
                dispatch(fetchMyRidesSuccess(response.data));
            }).catch( error => {
            console.log(error);
            dispatch(fetchMyRidesFail(error));
        })
    }
};

export const fetchMyRide = (token, pk) => {
    return dispatch => {
        dispatch(fetchMyRideStart());

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ token
            }
        };
        axios.get(API_HTTP + 'api/'+pk+'/edit/', config)
            .then( (response) => {
                console.log(response.data);
                dispatch(fetchMyRideSuccess(response.data));
            }).catch( error => {
            console.log(error);
            dispatch(fetchMyRideFail(error));
        })
    }
};

export const deleteMyRide = (pk, token) => {
    return dispatch => {
        dispatch(deleteMyRideStart());
        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ token
            }
        };
        axios.delete(API_HTTP+ 'api/' + pk + '/edit/', config).then(
            response => {
                dispatch(deleteMyRideSuccess());
                dispatch(fetchMyRides('',token));
            }
        ).catch( error => {
            console.log(error);
            dispatch(deleteMyRideFail(error));
        });
    }
};

export const updateMyRide = (pk, token, ride) => {
    return dispatch => {
        dispatch(updateMyRideStart());
        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ token
            }
        };
        axios.patch(API_HTTP+ 'api/' + pk + '/edit/', ride, config).then(
            response => {
                dispatch(updateMyRideSuccess(response.data));
                dispatch(fetchMyRides('',token));
            }
        ).catch( error => {
            console.log(error);
            dispatch(updateMyRideFail(error));
        });
    }
};
