import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchMoviesFilter } from '../actions';

import MoviesContainer from '../components/Movies/MoviesContainer';
import Pagination from '../components/Layout/Pagination';
import Loader from '../components/Extra/Loader';

function FilterMovies({
    page,
    fetchError,
    filters,
    isLoading,
    fetchMoviesFilter,
}) {
    useEffect(() => {
        fetchMoviesFilter(page, filters, 'filter');
    }, [fetchMoviesFilter, page, filters]);

    return (
        <Wrapper>
            <HeaderText>Movies based on filters applied</HeaderText>
            {fetchError && (
                <ErrorText>An error occured, please try again.</ErrorText>
            )}
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <MoviesContainer />
                </>
            )}
            <Pagination />
        </Wrapper>
    );
}

const mapStateToProps = (state) => ({
    page: state.movies.page,
    totalPages: state.movies.totalPages,
    filters: state.filter.filters,
    fetchError: state.movies.fetchError,
    isLoading: state.movies.isLoading,
});

export default connect(mapStateToProps, {
    fetchMoviesFilter,
})(FilterMovies);

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
