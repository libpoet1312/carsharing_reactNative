import * as actionTypes from './actionTypes';

export const webSocketConnectStart = (host) => {
    return { type: actionTypes.WS_CONNECT_START, host };
};

export const webSocketConnectSuccess = (host) => {
    return { type: actionTypes.WS_CONNECT_SUCCESS, host};
};

export const webSocketDisconnect = (host) => {
    return { type: actionTypes.WS_DISCONNECT, host };
};


export const webSocketMessage = (host, payload) => {
    console.log('from actions');
    console.log(payload, host);
    return { type: actionTypes.WS_MESSAGE, host, payload};
};
