import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer';
import MoviesReducer from './MoviesReducer';
import NavigationReducer from './NavigationReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
    movie: MovieReducer,
    movies: MoviesReducer,
    navigation: NavigationReducer,
    filter: FilterReducer,
});
