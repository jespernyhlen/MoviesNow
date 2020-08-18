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
    params: {
        api_key: `${TMDB_API_KEY}`,
    },
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

export const fetchMoviesFilter = (page = 1, filters, type) => async (
    dispatch
) => {
    let pageNumber = page || 1;
    let yearFilterString =
        filters.yearFilter[0] & filters.yearFilter[1]
            ? `&primary_release_date.gte=${filters.yearFilter[0]}-01-01&primary_release_date.lte=${filters.yearFilter[1]}-01-01`
            : '';
    let voteFilterString =
        filters.voteFilter[0] & filters.voteFilter[1]
            ? `&vote_average.gte=${filters.voteFilter[0]}&vote_average.lte=${filters.voteFilter[1]}`
            : '';
    let genreFilterString = filters.genreFilter.type
        ? `&with_genres=${filters.genreFilter.type}`
        : '';
    let url = `discover/movie?api_key=${TMDB_API_KEY}${genreFilterString}${yearFilterString}${voteFilterString}&page=${pageNumber}&include_adult=false`;

    dispatch({ type: MOVIES_FETCH_STARTED });

    try {
        const response = await CallMovieAPI.get(url);

        await Promise.all(
            response.data.results.map(async (movie) => {
                try {
                    const responseDetails = await CallMovieAPI.get(
                        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&&language=en-US`
                    );
                    movie.details = responseDetails.data;
                } catch (error) {
                    dispatch({ type: MOVIES_FETCH_FAILED });
                    console.error('Fetch Error: ' + error);
                }
            })
        );

        response.data['type'] = type;

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

export const fetchMovies = (url, query = '', type) => async (dispatch) => {
    let URLs = {
        trending: `/trending/movie/week?api_key=${TMDB_API_KEY}`,
        upcoming: `/discover/movie?api_key=${TMDB_API_KEY}`,
        search: `/search/movie?api_key=${TMDB_API_KEY}`,
    };

    if (type === 'search') {
        if (!query) {
            return;
        }
        dispatch({ type: SEARCH_QUERY, payload: query });
    }

    dispatch({ type: MOVIES_FETCH_STARTED });

    try {
        const response = await CallMovieAPI.get(URLs[type] + url);

        await Promise.all(
            response.data.results.map(async (movie) => {
                try {
                    const responseDetails = await CallMovieAPI.get(
                        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&&language=en-US`
                    );
                    movie.details = responseDetails.data;
                } catch (error) {
                    dispatch({ type: MOVIES_FETCH_FAILED });
                    console.error('Fetch Error: ' + error);
                }
            })
        );

        response.data['type'] = type;

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
