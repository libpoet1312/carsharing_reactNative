import * as actionTypes from './actionTypes';
import axios from 'axios';
import {API_HTTP} from "../../config";
import AsyncStorage from '@react-native-community/async-storage';

export const authStart =() => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user
    }
};

export const authFail = error => ({type: actionTypes.AUTH_FAIL, error});



//logout actions

export const ws_logout = () => {
    return {type: actionTypes.AUTH_LOGOUT}
};

export const logoutStart = () => {
    return {
        type: actionTypes.LOGOUT_START
    }
};

export const logoutFail = (error) => {
    return {
        type: actionTypes.LOGOUT_FAIL,
        error: error
    }
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
};

export const logout = () =>{
    return dispatch => {
        dispatch(logoutStart());
        dispatch(ws_logout());
        console.log( AsyncStorage.getItem('user'));
        axios.post(API_HTTP+'rest-auth/logout/',{
            token: AsyncStorage.getItem('user')

        }).then( () =>{
            // console.log(localStorage.getItem('user'));
            AsyncStorage.removeItem('user', error=>{
                console.log(error);
                console.log('skata');
            });
            dispatch(logoutSuccess());
        }).catch( error => {
            console.log('skata2');

            console.log(error);
            dispatch(logoutFail(error));
            AsyncStorage.removeItem('user', error=>{
                console.log(error);
            });
        });
    };
};


//facebook
export const facebookAuthStart = () => {
    return {
        type: actionTypes.FACEBOOK_AUTH_START
    }
};

export const facebookAuthFail = (error) => {
    return{
        type: actionTypes.FACEBOOK_AUTH_FAIL,
        error: error
    }
};

export const facebookAuthSuccess = (user) => {
    return{
        type: actionTypes.FACEBOOK_AUTH_SUCCESS,
        user: user
    }
};

//////////////////////////
// ASYNC ACTIONS BELOW //
/////////////////////////

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://snf-876572.vm.okeanos.grnet.gr/rest-auth/login/',{
            username,
            password
        }, ).then( response =>{
            const user = {
                token: response.data.token,
                user: response.data.user
            };
            console.log('123');
            AsyncStorage.setItem('user', JSON.stringify(user), error=>{
                console.log(error);
            });


            dispatch(authSuccess(user));
        }).catch( error => {

            console.log('edwsad');
            console.log(error.response);
            dispatch(authFail(error));
        });
    }
};

export const authSignup = (
    username, email, password1, password2,
    phone_number, avatar, gender, country,
    has_whatsup, has_viber, dob)  => {
    return dispatch => {
        dispatch(authStart());
        axios.post(API_HTTP+'rest-auth/registration/',{
            username: username,
            email: email,
            password1: password1,
            password2: password2,
            phone_number: phone_number,
            avatar: avatar,
            gender: gender,
            country: country,
            has_whatsup: has_whatsup,
            has_viber: has_viber,
            dob: dob,
        }).then (
            response =>{
                console.log(response);
                const user = {
                    token: response.data.token,
                    user: response.data.user
                };
                AsyncStorage.setItem('user', JSON.stringify(user), error=>{
                    console.log(error);
                });

                dispatch(authSuccess(user));
            }
        ).catch( (response, error) => {
            console.log(response);
            console.log(error);
            dispatch(authFail(error));
        });
    }
};


export const authCheckState =  () => {
    return dispatch => {
            AsyncStorage.getItem("user").then( user => {
            user = JSON.parse(user);

            if (user === undefined || user === null) {
                // console.log('123123');
                // dispatch(logout());
            } else {
                console.log('edwwww');

                // get again my requests!
                axios.get(API_HTTP + 'api/getmyrequests/',
                    {
                        headers:
                            {
                                "Authorization": "JWT "+ user.token,
                                "Content-type": "application/json"
                            }
                    }).then( response => {
                    user.user.request = response.data;

                    axios.get(API_HTTP + 'api/getallrequests/',
                        {
                            headers:
                                {
                                    "Authorization": "JWT "+ user.token,
                                    "Content-type": "application/json"
                                }
                        }).then( response => {
                        user.user.requestsOfMyRides = response.data;
                        axios.get(API_HTTP + 'notifier/getall/', {
                            headers:
                                {
                                    "Authorization": "JWT "+ user.token,
                                    "Content-type": "application/json"
                                }
                        }).then( response => {
                            user.user.notifications = response.data;
                            // console.log(response);

                            dispatch(authSuccess(user));
                        })
                    }).catch( error => {
                        console.log(error.response);
                        dispatch(authFail(error));
                    });
                }).catch( error => {
                    console.log(error.response);
                    dispatch(authFail(error));
                });
            }
        });
    }
};


// FACEBOOK LOGIN/SIGNUP
export const facebookAuth = (fbToken) => {
    return dispatch => {
        dispatch(facebookAuthStart());
        axios
            .post(
                API_HTTP + 'rest-auth/facebook/',
                {access_token: fbToken})
            .then( response =>{
                console.log(response);
                if(response.data.token){
                    const user = {
                        token: response.data.token,
                        user: response.data.user
                    };
                    AsyncStorage.setItem('user', JSON.stringify(user), error=>(console.log(error)));
                    dispatch(facebookAuthSuccess(user));
                }else{
                    dispatch(facebookAuthFail(response));
                }
            }).catch(error => {
            console.log(error);
            dispatch(facebookAuthFail(error));
        })
    }
};


