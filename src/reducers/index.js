import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer';
import MoviesReducer from './MoviesReducer';
import NavigationReducer from './NavigationReducer';

export default combineReducers({
    movie: MovieReducer,
    movies: MoviesReducer,
    navigation: NavigationReducer,
});
