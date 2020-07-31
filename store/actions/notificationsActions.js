import axios from 'axios';
import {API_HTTP} from "../../config";
import * as actionTypes from "./actionTypes";

const setRead = id => {
    return {
        type: actionTypes.SET_READ,
        id: id
    }
};

const setAllRead = notifications => {
    return {
        type: actionTypes.SET_ALL_READ,
        notifications: notifications
    }
};


export const setNotificationRead = (id, token) => {
    return dispatch => {
        axios.get(API_HTTP + 'notifier/mark-as-read/'+id+'/',
            {
                headers:
                    {
                        "Authorization": "JWT "+ token,
                        "Content-type": "application/json"
                    }}
        ).then( response => {
            // console.log(response);
            dispatch(setRead(id))
        }).catch( error => {
            console.log(error);
        })
    }
};

export const setAllNotificationsRead = (token) => {
    return dispatch => {
        axios.get( API_HTTP + 'notifier/mark-all-as-read/', {
            headers:
                {
                    "Authorization": "JWT "+ token,
                    "Content-type": "application/json"
                }
        }).then( response => {
            dispatch(setAllRead(response.data))
        }).catch( error => {
            console.log(error);
        })
    }
};

export const receiveNotification = (notification) => {
    return {
        type: actionTypes.RECEIVE_NOTIFICATION,
        notification: notification
    }
};
