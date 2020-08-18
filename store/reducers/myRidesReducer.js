import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../updateObject';

const initialState = {
    rides: null,
    error: null,
    loading: false,
    pager: {}
};

// REDUCERS

const fetchRidesStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    })
};

const fetchRidesFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
};

const fetchRidesSuccess = (state, action) => {
    // console.log(action.rides);
    let next = action.rides.next;
    let nextUrl = null;
    let prev = action.rides.previous;
    let prevUrl = null;

    let currentPage = 1;



    // find current page
    if(next){
        nextUrl = new URL(next);
        let params = nextUrl.searchParams;
        currentPage = params.get('page') - 1;

        // console.log('[next]', currentPage);
    }else if (prev && !next){
        // last page / pages > 2
        prevUrl = new URL(prev);
        let params = prevUrl.searchParams;
        if(params.has('page')){
            currentPage = params.get('page') + 1;
        }else{
            currentPage = 2;
        }

        // console.log('[prev]', currentPage);
    }


    console.log("[currentPage]", currentPage);
    let pager = getPager(action.rides.count, currentPage, nextUrl, prevUrl);
    // console.log(pager);
    let newRides = action.rides.results;
    // if(state.rides && pager.currentPage<pager.totalPages){
    //     newRides = action.rides.results.concat(state.rides);
    // }
    // if(state.rides){
    //     newRides = action.rides.results.concat(state.rides);
    // }

    return {
        ...state,
        error: null,
        loading: false,
        rides: newRides,
        pager: updateObject(state.pager, pager)
    }
};


const getPager = (totalItems, currentPage, nextPageUrl, prevPageUrl) =>{
    currentPage = currentPage || 1;

    // default page size is 2
    let pageSize = 2;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages,
        nextPageUrl,
        prevPageUrl
    };
};


const deleteMyRideStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    });
};

const deleteMyRideFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
};

const deleteMyRidesSuccess = (state) => {
    return updateObject(state, {
        loading: false,
    })
};

// the reducer:

const myRidesReducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MY_RIDES_START: return fetchRidesStart(state);
        case actionTypes.FETCH_MY_RIDES_FAIL: return fetchRidesFail(state, action);
        case actionTypes.FETCH_MY_RIDES_SUCCESS: return fetchRidesSuccess(state, action);
        case actionTypes.DELETE_MY_RIDE_START: return deleteMyRideStart(state);
        case actionTypes.DELETE_MY_RIDE_FAIL: return deleteMyRideFail(state, action);
        case actionTypes.DELETE_MY_RIDE_SUCCESS: return deleteMyRidesSuccess(state);

        default:
            return state;
    }
};

export default myRidesReducer;
