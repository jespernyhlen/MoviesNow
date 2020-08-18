import {
    MOVIES_FETCH_STARTED,
    MOVIES_FETCH_FAILED,
    MOVIES_FETCH_FINISHED,
    SEARCH_QUERY,
    SET_PAGE,
} from '../actions/types';

const INITIAL_STATE = {
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
