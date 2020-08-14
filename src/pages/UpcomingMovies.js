import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions';
import styled from 'styled-components';

import Loader from '../components/Extra/Loader';
import MoviesContainer from '../components/Movies/MoviesContainer';

const UpcomingMovies = ({ page, fetchMovies, fetchError, isLoading }) => {
    let searchDates = getSearchDates(365);

    const url = `&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&release_date.gte=${searchDates.from}&release_date.lte=${searchDates.end}&with_release_type=3%7C2`;

    useEffect(() => {
        fetchMovies(url, '', 'upcoming');
    }, [fetchMovies, url]);

    return (
        <Wrapper>
            <HeaderText>Movies soon to be released</HeaderText>
            {fetchError && (
                <ErrorText>An error occured, please try again.</ErrorText>
            )}
            {isLoading ? <Loader /> : <MoviesContainer />}
        </Wrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        type: state.movies.type,
        page: state.movies.page,
        fetchError: state.movies.fetchError,
        isLoading: state.movies.isLoading,
    };
};

export default connect(mapStateToProps, { fetchMovies })(UpcomingMovies);

const Wrapper = styled.div`
    margin: 8em 0 6rem;

    @media only screen and (max-width: 600px) {
        margin: 12rem 0 6rem;
    }
`;

const HeaderText = styled.h1`
    font-size: 1.5rem;
    margin: 0 2.5rem;
    color: #ccc;
    font-weight: 400;
    border-bottom: 2px solid #e47604;
    width: fit-content;
    padding-bottom: 1rem;
`;

const ErrorText = styled(HeaderText)`
    font-size: 1.5rem;
    margin: 1rem 2.5rem;
    color: #aaa;
    font-weight: 100;
    border-bottom: 0;
    font-style: italic;
`;

const getSearchDates = (days) => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    let endDate = currentDate.toISOString().substring(0, 10);
    let fromDate = new Date().toISOString().substring(0, 10);

    return { from: fromDate, end: endDate };
};
