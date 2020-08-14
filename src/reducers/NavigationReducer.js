import { NAVIGATION_OPEN } from '../actions/types';

const INITIAL_STATE = {
    isOpen: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NAVIGATION_OPEN:
            return {
                ...state,
                isOpen: action.payload,
            };

        default:
            return state;
    }
};
