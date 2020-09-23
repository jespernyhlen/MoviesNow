import { SET_FILTERS, FILTER_OPEN, RESET_FILTERS } from '../actions/types';

const INITIAL_STATE = {
    filters: {
        yearFilter: [],
        voteFilter: [],
        genreFilter: {},
    },
    filterOpen: false,
    resetFilters: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
                loading: false,
            };
        case FILTER_OPEN:
            return {
                ...state,
                filterOpen: action.payload,
            };

        case RESET_FILTERS:
            return {
                ...state,
                resetFilters: action.payload,
            };

        default:
            return state;
    }
};
