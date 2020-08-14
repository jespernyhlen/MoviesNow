import {
    MOVIE_FETCH_STARTED,
    MOVIE_FETCH_FAILED,
    MOVIE_FETCH_FINISHED,
    MOVIE_DETAILS_OPEN,
} from '../actions/types';

const INITIAL_STATE = {
    movie: null,
    involved: null,
    fetchError: false,
    isLoading: false,
    isOpen: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOVIE_FETCH_STARTED:
            return {
                ...state,
                fetchError: false,
                isLoading: true,
            };

        case MOVIE_FETCH_FAILED:
            return {
                ...state,
                fetchError: true,
                isLoading: false,
            };

        case MOVIE_FETCH_FINISHED:
            return {
                ...state,
                movie: action.payload,
                involved: { ...action.payload.credits },
                fetchError: false,
                isLoading: false,
            };

        case MOVIE_DETAILS_OPEN:
            return {
                ...state,
                isOpen: action.payload,
            };

        default:
            return state;
    }
};
