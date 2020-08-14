import {
    MOVIES_FETCH_STARTED,
    MOVIES_FETCH_FAILED,
    MOVIES_FETCH_FINISHED,
    SEARCH_QUERY,
    SET_PAGE,
    // ------------ UNDER DEVELOPMENT ------------
    // SET_FILTERS,
    // FILTERACTIVE,
} from '../actions/types';

const INITIAL_STATE = {
    // ------------ UNDER DEVELOPMENT ------------
    // filters: {
    //     yearFilter: [],
    //     voteFilter: [],
    //     genreFilter: {},
    // },
    // filterActive: false,

    movies: [],
    totalPages: 1,
    page: 1,
    type: 'trending',
    searchQuery: '',
    fetchError: false,
    isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // ------------ UNDER DEVELOPMENT ------------
        // case SET_FILTERS:
        //     return {
        //         ...state,
        //         filters: action.payload,
        //         loading: false,
        //     };
        // case FILTERACTIVE:
        //     return {
        //         ...state,
        //         filterActive: action.payload,
        //     };
        case MOVIES_FETCH_STARTED:
            return {
                ...state,
                fetchError: false,
                isLoading: true,
            };

        case MOVIES_FETCH_FAILED:
            return {
                ...state,
                fetchError: true,
                isLoading: false,
            };

        case MOVIES_FETCH_FINISHED:
            return {
                ...state,
                movies: action.payload.results,
                totalPages: action.payload.total_pages,
                page: action.payload.page,
                type: action.payload.type,
                fetchError: false,
                isLoading: false,
            };

        case SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };

        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            };

        default:
            return state;
    }
};
