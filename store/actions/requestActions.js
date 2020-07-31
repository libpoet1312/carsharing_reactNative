import * as actionTypes from './actionTypes';
import axios from "axios";
import {API_HTTP} from "../../config";

// JOIN
export const joinRequestStart = () => {
    return {
        type: actionTypes.JOIN_REQUEST_START
    }
};

export const joinRequestFail = () => {
    return {
        type: actionTypes.JOIN_REQUEST_FAIL
    }
};

export const joinRequestSuccess = (requests) => {
    return {
        type: actionTypes.JOIN_REQUEST_SUCCESS,
        requests: requests
    }
};

export const joinRequest = (pk, token, seats, message) => {
    return dispatch => {
        const send = {
            seats: seats,
            message: message
        };
        dispatch(joinRequestStart());
        axios.post(API_HTTP + 'api/'+pk+'/join/', send,
            {
                headers:
                    {
                        "Authorization": "JWT "+ token,
                        "Content-type": "application/json"
                    }
            }).then( response => {
            // console.log(response);

            dispatch(joinRequestSuccess(response.data));
        }).catch( error => {
            console.log(error);
            dispatch(joinRequestFail(error));
        });
    }
};

export const acceptRequest = () => {
    return {
        type: actionTypes.ACCEPT_REQUEST
    }
};

export const declineRequest = () => {
    return {
        type: actionTypes.DECLINE_REQUEST
    }
};



// UNJOIN
export const unJoinStart = () => {
    return {
        type: actionTypes.UNJOIN_START
    }
};

export const unJoinFail = (error) => {
    return {
        type: actionTypes.UNJOIN_FAIL,
        error: error
    }
};

export const unJoinSuccess = (pk) => {
    return {
        type: actionTypes.UNJOIN_SUCCESS,
        pk: pk
    }
};

export const unJoin = (pk, token, ridePK) => {
    return dispatch => {
        dispatch(unJoinStart());
        console.log(ridePK);
        axios.get(API_HTTP + 'api/'+ridePK+'/unjoin/',
            {
                headers:
                    {
                        "Authorization": "JWT "+ token,
                        "Content-type": "application/json"
                    }
            }).then( response => {
            console.log(response);

            dispatch(unJoinSuccess(pk));
        }).catch( error => {
            console.log(error);
            dispatch(unJoinFail(error));
        });
    }
};


// Update REQUESTS from websocket!
export const addRequestsOfMyRides = (request) => {
    return {
        type: actionTypes.ADD_REQUESTS_OF_RIDES,
        request: request
    }
};

export const removeRequestsOfMyRides = (request) => {
    return {
        type: actionTypes.REMOVE_REQUESTS_OF_RIDES,
        request: request
    }
};


export const removeRequest = (request) => {
    return {
        type: actionTypes.REMOVE_REQUESTS,
        request: request
    }
};

export const updateRequests = (request) => {
    return {
        type: actionTypes.UPDATE_REQUESTS,
        request: request
    }
};




export const declineJoinSuccess = (pk) => {
    return {
        type: actionTypes.DECLINE_JOIN,
        pk: pk
    }
};


// decline join
export const declineJoin = (pk, ridePK, token, userID) => {
    return dispatch => {
        axios.get(API_HTTP + 'api/'+ridePK+'/declinejoin/'+userID+'/',
            {
                headers:
                    {
                        "Authorization": "JWT "+ token,
                        "Content-type": "application/json"
                    }
            }).then( response => {
            console.log(response);

            dispatch(declineJoinSuccess(pk));
        }).catch( error => {
            console.log(error);
        });
    };
};



export const acceptJoinSuccess = pk => {
    return {
        type: actionTypes.ACCEPT_JOIN,
        pk: pk
    }
};

export const acceptJoin = (pk, ridePK, token, userID) => {
    return dispatch => {
        axios.get(API_HTTP + 'api/'+ridePK+'/acceptjoin/'+userID+'/',
            {
                headers:
                    {
                        "Authorization": "JWT "+ token,
                        "Content-type": "application/json"
                    }
            }).then( response => {
            console.log(response);

            dispatch(acceptJoinSuccess(pk));
        }).catch( error => {
            console.log(error);
        });
    }
};
