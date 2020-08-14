import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { movieOpen } from '../../actions';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faStopwatch,
    faComment,
    faExternalLinkAlt,
    faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

import PlaceHolderImage from '../Images/placeholder-movieposter.png';
import Involved from './Involved';

const Details = ({ movie, movieOpen }) => {
    const [image1Loaded, setImage1Loaded] = useState(false);
    let history = useHistory();

    useEffect(() => {
        movieOpen(true);

        return () => {
            movieOpen(false);
        };
    }, [movieOpen]);

    let genresArray = movie ? movie.genres.map((item) => item.name) : null;
    const convertRuntime = (num) => {
        let hours = num / 60;
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return rhours + 'h ' + rminutes + 'm';
    };

    const convertedRuntime = movie ? convertRuntime(movie.runtime) : null;

    const convertedReleaseDate = movie
        ? moment(movie.release_date, 'YYYY-MM-DD')
        : null;

    let handleClick = () => {
        history.goBack();
    };

    return (
        <>
            {movie ? (
                <>
                    <CenterContainer className='Fade'>
                        <MovieContainer>
                            <MovieImage>
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                            : PlaceHolderImage
                                    }
                                    alt='Movie Poster'
                                />
                            </MovieImage>
                            <MovieContent>
                                <MovieHeader>
                                    <MovieTitle>{movie.title}</MovieTitle>
                                    <Text>
                                        {convertedReleaseDate.format('LL')}
                                    </Text>
                                </MovieHeader>
                                {movie.tagline && (
                                    <TaglineText>{movie.tagline}</TaglineText>
                                )}
                                <MovieGenres>
                                    {genresArray.join(' / ')}
                                </MovieGenres>
                                <MovieDescription>
                                    <p>{movie.overview}</p>
                                </MovieDescription>
                                <MovieIcons>
                                    {movie.runtime !== 0 && (
                                        <>
                                            <RuntimeIcon />
                                            <h3>{convertedRuntime}</h3>
                                        </>
                                    )}
                                    {movie.vote_average !== 0 && (
                                        <>
                                            <RatingIcon />
                                            <h3>{movie.vote_average}</h3>
                                        </>
                                    )}
                                    {movie.original_language && (
                                        <>
                                            <LanguageIcon />
                                            <h3>{movie.original_language}</h3>
                                        </>
                                    )}
                                    {movie.imdb_id && (
                                        <>
                                            <ImdbIcon />
                                            <h3>
                                                <ImdbLink
                                                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    IMDb
                                                </ImdbLink>
                                            </h3>
                                        </>
                                    )}
                                </MovieIcons>
                                <DetailContainer>
                                    <Involved />
                                </DetailContainer>
                            </MovieContent>
                            <BackContainer>
                                <BackButton onClick={handleClick}></BackButton>
                            </BackContainer>
                        </MovieContainer>
                    </CenterContainer>
                    <MovieBackgroundContainer
                        className={
                            !image1Loaded
                                ? 'movie-bg-container movie-transition'
                                : 'movie-bg-container'
                        }
                    >
                        <MovieBackgroundImage
                            onLoad={() => {
                                setImage1Loaded(true);
                            }}
                            src={
                                movie.backdrop_path
                                    ? `https://image.tmdb.org/t/p/w400/${movie.backdrop_path}`
                                    : movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
                                    : PlaceHolderImage
                            }
                            alt='background image'
                        />
                    </MovieBackgroundContainer>
                    <MovieBackgroundOverlay
                        className={
                            image1Loaded ? 'movie-bg' : 'movie-bg loaded'
                        }
                    ></MovieBackgroundOverlay>
                </>
            ) : null}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        movie: state.movie.movie,
        movieOpen: state.movie.movieOpen,
    };
};

export default connect(mapStateToProps, { movieOpen })(Details);

const CenterContainer = styled.div`
    position: absolute;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1440px;
    margin: 0 auto;
    left: 0;
    right: 0;
`;

const MovieContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: rgba(27, 6, 65, 0.1) 0px 1px 20px;
    width: 100%;
    background: #0000002e;
    border-radius: 5px;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(81, 81, 81, 0.11);
    margin: auto;

    @media only screen and (max-width: 768px) {
        position: relative;
        flex-direction: column;
        background: none;
        border-style: none;
        box-shadow: none;
        height: 100%;
        padding: 3rem;
    }

    @media only screen and (max-width: 600px) {
        padding: 1.5rem;
    }
`;

const MovieImage = styled.div`
    margin: 1rem 2rem 1rem 1rem;

    @media only screen and (max-width: 1440px) {
        img {
            width: 30vw;
        }
    }
    @media only screen and (max-width: 768px) {
        margin: 0 0 5rem;
        img {
            width: 50vw;
        }
    }

    @media only screen and (max-width: 768px) {
        img {
            width: 100%;
        }
    }
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 3rem;
`;

const MovieContent = styled.div`
    margin: 1rem 1rem 1rem 0;

    @media only screen and (max-width: 768px) {
        margin: 0rem;
    }
`;

const MovieHeader = styled.div`
    margin-bottom: 1rem !important;
    h1 {
        font-size: 3rem;
        display: inline;
    }

    p {
        display: inline;
        padding-left: 0.5em;
        font-size: 1.5rem;
        font-weight: 700;
        color: #e2e2e2a6;
    }
`;

const MovieTitle = styled.h1``;

const TaglineText = styled.h3`
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 100;
`;

const Text = styled.p``;

const MovieGenres = styled.h2`
    font-size: 1.5rem;
    font-weight: 300;
    color: #e2e2e2a6;
    margin-bottom: 1rem;
`;

const MovieDescription = styled.div`
    font-size: 1.5rem;
    font-weight: 100;
    margin-bottom: 2rem;
`;

const MovieIcons = styled.div`
    display: flex;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #ffffff12;

    svg {
        margin-left: 4rem;

        @media only screen and (max-width: 600px) {
            margin-left: 3rem;
        }
    }

    & svg:nth-child(1) {
        margin-left: 0;
    }

    h3 {
        align-self: center;
        font-weight: 400;
    }
`;

const RuntimeIcon = styled(FontAwesomeIcon).attrs({ icon: faStopwatch })`
    margin: 0 0.5rem 0 0;
    width: 20px !important;
    height: 20px !important;
    path {
        fill: #007bff;
    }
`;

const RatingIcon = styled(FontAwesomeIcon).attrs({ icon: faStar })`
    margin: 0 0.5rem 0 0;
    width: 20px !important;
    height: 20px !important;
    path {
        fill: gold;
    }
`;

const LanguageIcon = styled(FontAwesomeIcon).attrs({ icon: faComment })`
    margin: 0 0.5rem 0 0;
    width: 20px !important;
    height: 20px !important;
    path {
        fill: #28a745;
    }
`;

const ImdbIcon = styled(FontAwesomeIcon).attrs({ icon: faExternalLinkAlt })`
    margin: 0 0.5rem 0 0;
    width: 20px !important;
    height: 20px !important;
    path {
        fill: gold;
    }
`;

const ImdbLink = styled.a`
    text-decoration: underline;
    font-weight: 400;
    color: #f8f9fa;
    transition: 0.3s all;

    &:hover {
        color: #f8f9fa63 !important;
    }

    h3 {
        align-self: center;
    }
`;

const BackContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px 20px 0 0;
    @media only screen and (max-width: 768px) {
        position: fixed;
        box-shadow: 0 1px 100px rgba(0, 0, 0, 0.9);
        border-radius: 50%;
    }
`;

const BackButton = styled(FontAwesomeIcon).attrs({
    icon: faArrowAltCircleLeft,
})`
    width: 40px !important;
    height: 40px !important;
    color: #f8f9fa;
    transition: 0.3s all;

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const MovieBackgroundImage = styled.img`
    filter: blur(25px);
    height: 100vh;
    width: 105vw;
    z-index: -1;
    transform: scale(1.2);
`;

const MovieBackgroundContainer = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    z-index: -1;
    transition: 0.4s all;

    &.movie-transition {
        transform: translateX(4em);
    }
`;

const MovieBackgroundOverlay = styled.div`
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: -1;

    &.loaded {
        background: #000;
    }
`;
