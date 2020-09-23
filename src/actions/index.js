import {
    MOVIE_FETCH_STARTED,
    MOVIE_FETCH_FAILED,
    MOVIE_FETCH_FINISHED,
    MOVIE_DETAILS_OPEN,
    MOVIES_FETCH_STARTED,
    MOVIES_FETCH_FAILED,
    MOVIES_FETCH_FINISHED,
    SEARCH_QUERY,
    NAVIGATION_OPEN,
    SET_PAGE,
    FILTER_OPEN,
    SET_FILTERS,
    RESET_FILTERS,
} from './types';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const CallMovieAPI = require('axios').create({
    baseURL: 'https://api.themoviedb.org/3',
});

export const setFilterOpen = (open) => (dispatch) => {
    dispatch({
        type: FILTER_OPEN,
        payload: open,
    });
};

export const setFilters = (filters) => (dispatch) => {
    dispatch({
        type: SET_FILTERS,
        payload: filters,
    });
};

export const resetFilters = (reset) => (dispatch) => {
    dispatch({
        type: RESET_FILTERS,
        payload: reset,
    });
};

export const fetchMoviesFilter = (page = 1, filters) => async (dispatch) => {
    let yearFilterString = '';
    let voteFilterString = '';
    let genreFilterString = '';

    if (filters.yearFilter[0] && filters.yearFilter[1]) {
        yearFilterString = `&primary_release_date.gte=${filters.yearFilter[0]}-01-01&primary_release_date.lte=${filters.yearFilter[1]}-01-01`;
    }

    if (filters.voteFilter[0] && filters.voteFilter[1]) {
        voteFilterString = `&vote_average.gte=${filters.voteFilter[0]}&vote_average.lte=${filters.voteFilter[1]}`;
    }

    if (filters.genreFilter.type) {
        genreFilterString = `&with_genres=${filters.genreFilter.type}`;
    }

    let URL = `discover/movie?api_key=${TMDB_API_KEY}${genreFilterString}${yearFilterString}${voteFilterString}&page=${page}&include_adult=false`;

    dispatch({ type: MOVIES_FETCH_STARTED });

    try {
        const response = await CallMovieAPI.get(URL);
        response.data['type'] = 'filter';

        dispatch({
            type: MOVIES_FETCH_FINISHED,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIE_FETCH_FAILED });
        console.error('Fetch Error: ' + error);
    }
};

export const fetchMovie = (id) => async (dispatch) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`;
    dispatch({ type: MOVIE_FETCH_STARTED });

    try {
        const response = await CallMovieAPI.get(url);
        dispatch({ type: MOVIE_FETCH_FINISHED, payload: response.data });
    } catch (error) {
        dispatch({ type: MOVIE_FETCH_FAILED });
        console.error('Fetch Error: ' + error);
    }
};

export const fetchSearchMovies = (page = 1, query) => async (dispatch) => {
    if (!query) {
        return;
    }
    dispatch({ type: SEARCH_QUERY, payload: query });
    dispatch({ type: MOVIES_FETCH_STARTED });

    let URL = `/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false&840`;

    try {
        const response = await CallMovieAPI.get(URL);
        response.data['type'] = 'search';

        dispatch({
            type: MOVIES_FETCH_FINISHED,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIES_FETCH_FAILED });
        console.error('Fetch Error: ' + error);
    }
};

export const fetchInTheatresMovies = (page = 1) => async (dispatch) => {
    dispatch({ type: MOVIES_FETCH_STARTED });
    let URL = `/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    try {
        const response = await CallMovieAPI.get(URL);
        response.data['type'] = 'intheatres';

        dispatch({
            type: MOVIES_FETCH_FINISHED,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIES_FETCH_FAILED });
        console.error('Fetch Error: ' + error);
    }
};

export const fetchUpcomingMovies = (page = 1, fromDate, endDate) => async (
    dispatch
) => {
    dispatch({ type: MOVIES_FETCH_STARTED });
    let URL = `/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&release_date.gte=${fromDate}&release_date.lte=${endDate}&with_release_type=3%7C2`;

    try {
        const response = await CallMovieAPI.get(URL);
        response.data['type'] = 'upcoming';

        dispatch({
            type: MOVIES_FETCH_FINISHED,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIES_FETCH_FAILED });
        console.error('Fetch Error: ' + error);
    }
};

export const fetchTopratedMovies = (page = 1) => async (dispatch) => {
    dispatch({ type: MOVIES_FETCH_STARTED });
    let URL = `/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    try {
        const response = await CallMovieAPI.get(URL);
        response.data['type'] = 'toprated';

        dispatch({
            type: MOVIES_FETCH_FINISHED,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIES_FETCH_FAILED });
        console.error('Fetch Error: ' + error);
    }
};

export const fetchTrendingMovies = (page = 1) => async (dispatch) => {
    dispatch({ type: MOVIES_FETCH_STARTED });

    try {
        const response = await CallMovieAPI.get(
            `/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
        );
        response.data['type'] = 'trending';

        dispatch({
            type: MOVIES_FETCH_FINISHED,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIES_FETCH_FAILED });
        console.error('Fetch Error: ' + error);
    }
};

export const movieOpen = (isOpen) => (dispatch) => {
    dispatch({
        type: MOVIE_DETAILS_OPEN,
        payload: isOpen,
    });
};

export const setNavOpen = (isOpen) => (dispatch) => {
    dispatch({
        type: NAVIGATION_OPEN,
        payload: isOpen,
    });
};

export const setPage = (page) => (dispatch) => {
    dispatch({
        type: SET_PAGE,
        payload: page,
    });
};
