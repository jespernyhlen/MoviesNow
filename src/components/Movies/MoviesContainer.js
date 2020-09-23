import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import MovieCard from './MovieCard';

const MoviesContainer = ({ movies }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return movies.length ? (
        <MovieContainer>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
        </MovieContainer>
    ) : (
        <NoMovieText>No movies to show..</NoMovieText>
    );
};

const mapStateToProps = (state) => {
    return {
        movies: state.movies.movies,
    };
};

export default connect(mapStateToProps)(MoviesContainer);

const MovieContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding: 0.5rem 1.5rem;
`;

const NoMovieText = styled.p`
    position: absolute;
    top: 50%;
    left: calc(50% - 150px);
    width: 300px;
    text-align: center;
    font-size: 1.5rem;
    color: #aaa;
    font-weight: 100;
    font-style: italic;
`;
