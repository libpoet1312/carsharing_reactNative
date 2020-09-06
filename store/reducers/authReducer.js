import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../updateObject';

const initialState = {
    user: null,
    requests: [],
    requestsOfMyRides: [],
    notifications: [],
    error: null,
    loading: false,
};

// REDUCERS
const authStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    })
};

const authSuccess = (state, action) => {
    // console.log(action.user);
    const user = {
        pk: action.user.user.pk,
        username: action.user.user.username,
        avatar: action.user.user.avatar,
        token: action.user.token
    };
    // console.log(action.user.user.requestsOfMyRides);



    return updateObject(state, {
        user: user,
        loading:false,
        requests: action.user.user.request,
        requestsOfMyRides: action.user.user.requestsOfMyRides,
        notifications: action.user.user.notifications,
    })
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading:false
    })
};

const logoutSuccess = (state) => {
    return updateObject(state, {
        user: null
    })
};

const facebookAuthStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    })
};

const facebookAuthSuccess = (state, action) => {
    // console.log(action.user);
    const user = {
        pk: action.user.user.pk,
        username: action.user.user.username,
        avatar: action.user.user.avatar,
        token: action.user.token
    };
    return updateObject(state, {
        user: user,
        loading:false,
        requests: action.user.user.request,
    })
};

const facebookAuthFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading:false
    })
};

const joinRequestSuccess = (state, action) => {
    const oldReq = state.requests;
    let newArray = oldReq.concat(action.requests);
    return updateObject(state, {
        requests: newArray
    })
};

const unJoinSuccess = (state, action) => {
    const indexToRemove = state.requests.findIndex( el => {
        console.log(el);
        return el.pk === action.pk;
    });

    console.log(indexToRemove);

    return updateObject(state, {
        requests: [...state.requests.slice(0, indexToRemove), ...state.requests.slice(indexToRemove+1)]
    })
};




// declineJoin
const declineJoin = (state, action) => {
    const indexToRemove = state.requestsOfMyRides.findIndex( el => {
        // console.log(el);
        return el.pk === action.pk;
    });
    // console.log(indexToRemove);

    return updateObject(state, {
        requestsOfMyRides: [...state.requestsOfMyRides.slice(0, indexToRemove), ...state.requestsOfMyRides.slice(indexToRemove+1)]
    })
};

// accept join
const acceptJoin = (state, action) => {

    // console.log(state.requestsOfMyRides);
    const newData = state.requestsOfMyRides.map( item => {
        if(item.pk === action.pk){
            return{
                ...item,
                accepted: true
            }
        }
        return item
    });

    return updateObject(state,{
        requestsOfMyRides: newData
    })
};

// update requests FROM WEBSOCKETS
const removeRequest = (state, action) => {
    const indexToRemove = state.requests.findIndex( el => {
        // console.log(el);
        return el.pk===action.request.pk
    });
    // console.log(indexToRemove);

    return updateObject(state, {
        requests: [...state.requests.slice(0, indexToRemove), ...state.requests.slice(indexToRemove+1)]
    })
};

// UPDATE RequestsOfMyRides RFROM WEBSOCKETS
const addRequestsOfMyRides = (state, action) => {
    const oldArray = state.requestsOfMyRides;
    const index = state.requestsOfMyRides.findIndex( el => {
        // console.log(el, action.request);
        return el.pk === action.request.pk;
    });
    // console.log(index);
    if(index<0){
        const newArray = oldArray.concat(action.request);
        return updateObject(state, {
            requestsOfMyRides: newArray
        })
    }else{
        return state;
    }

};

const removeRequestsOfMyRides = (state, action) => {
    // console.log(action.request);
    // console.log(state.requestsOfMyRides);

    const indexToRemove = state.requestsOfMyRides.findIndex( el => {
        console.log(el);
        return el.pk===action.request.pk
    });
    // console.log(indexToRemove);

    return updateObject(state, {
        requestsOfMyRides: [...state.requestsOfMyRides.slice(0, indexToRemove), ...state.requestsOfMyRides.slice(indexToRemove+1)]
    })

};

const updateRequest = (state, action) => {

    const Data = state.requests.map( item => {
        // console.log(item.pk, action.pk);
        if(item.pk === action.request.pk){
            return{
                ...item,
                accepted: true
            }
        }
        return item
    });
    // console.log(Data);

    return updateObject(state,{
        requests: Data
    })
};


const setNotificationAsRead = (state, action) => {
    const notifications = state.notifications.map( item => {
        // console.log(item.id, action.id);
        if(item.id === action.id){
            return{
                ...item,
                unread: false
            }
        }
        return item
    });
    // console.log(notifications);

    return updateObject(state,{
        notifications: notifications
    })
};

const receiveNotification = (state, action) => {
    const oldNotifications = state.notifications;
    const index = oldNotifications.findIndex( el => {
        // console.log(el, action.notification);
        return el.id === action.notification.id;
    });
    // console.log(index);
    if(index<0){
        const newArray = oldNotifications.concat(action.notification);
        return updateObject(state, {
            notifications: newArray
        })
    }else{
        return state;
    }
};

const setAllNotificationsAsRead = (state, action) => {
    return updateObject(state, {
        notifications: action.notifications
    })
};

const updateProfile = (state, action) => {

    const user = {
        pk: action.user.pk,
        username: action.user.username,
        avatar: action.user.avatar,
        token: state.user.token
    };

    return updateObject(state, {
        user: user
    })
};

// ONE REDUCER
const authReducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.LOGOUT_SUCCESS: return logoutSuccess(state, action);

        case actionTypes.FACEBOOK_AUTH_START: return facebookAuthStart(state, action);
        case actionTypes.FACEBOOK_AUTH_SUCCESS: return facebookAuthSuccess(state, action);
        case actionTypes.FACEBOOK_AUTH_FAIL: return facebookAuthFail(state, action);

        case actionTypes.JOIN_REQUEST_SUCCESS: return joinRequestSuccess(state, action);
        case actionTypes.UNJOIN_SUCCESS: return unJoinSuccess(state,action);

        case actionTypes.ADD_REQUESTS_OF_RIDES: return addRequestsOfMyRides(state, action);
        case actionTypes.REMOVE_REQUESTS_OF_RIDES: return removeRequestsOfMyRides(state, action);

        case actionTypes.DECLINE_JOIN: return declineJoin(state, action);
        case actionTypes.ACCEPT_JOIN: return acceptJoin(state, action);

        case actionTypes.REMOVE_REQUESTS: return removeRequest(state, action);
        case actionTypes.UPDATE_REQUESTS: return updateRequest(state, action);

        case actionTypes.SET_READ: return setNotificationAsRead(state, action);
        case actionTypes.SET_ALL_READ: return setAllNotificationsAsRead(state, action);
        case actionTypes.RECEIVE_NOTIFICATION: return receiveNotification(state, action);

        case actionTypes.UPDATE_PROFILE_SUCCESS: return updateProfile(state, action);

        default:
            return state;
    }
};

export default authReducer;
