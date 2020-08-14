import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import PlaceHolderImage from '../Images/placeholder-movieposter.png';

const MovieCard = ({ movie }) => {
    const {
        poster_path,
        title,
        vote_average,
        id,
        release_date,
        details,
    } = movie;

    const { path } = useRouteMatch();

    let releaseDate = release_date ? release_date : details.release_date;
    let yearMonthList = releaseDate.split('-');

    releaseDate = `${yearMonthList[0]}/${yearMonthList[1]}`;

    let movieDetailsPath = `${path}/${id}/details`;

    return (
        <MovieCardContainer>
            <Link to={movieDetailsPath}>
                <CardImage
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w400${poster_path}`
                            : PlaceHolderImage
                    }
                    alt={`${title} poster`}
                />
            </Link>
            <DetailsContainer>
                <RatingContainer>
                    <RatingIcon />
                    {vote_average}
                </RatingContainer>
                <DateContainer>{releaseDate}</DateContainer>
            </DetailsContainer>
            <TitleContainer>{title}</TitleContainer>
        </MovieCardContainer>
    );
};

export default MovieCard;

const MovieCardContainer = styled.div`
    position: relative;
    margin: 36px 20px;
    display: flex;
    transition: all ease-in-out 300ms;
    box-shadow: 0 3px 30px rgba(0, 0, 0, 0.2);
    background: #00000061;
    color: #fff;
    min-height: 200px;

    :hover {
        cursor: pointer;
        backface-visibility: hidden;
        transform: scale(1.05);
    }

    :active {
        transform: translateY(-0.1rem);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }

    @media screen and (max-width: 3000px) {
        width: calc(14.2857% - 36px);
        margin: 24px 18px;
    }

    @media screen and (max-width: 1921px) {
        width: calc(16.6667% - 28px);
        margin: 22px 14px;
    }

    @media screen and (max-width: 1440px) {
        width: calc(20% - 20px);
        margin: 15px 10px;
        img {
            min-width: auto;
            min-height: auto;
        }
    }

    @media screen and (max-width: 1025px) {
        width: calc(25% - 16px);
        margin: 10px 8px;
    }

    @media screen and (max-width: 779px) {
        width: calc(33.33% - 16px);
        margin: 10px 8px;
    }

    @media screen and (max-width: 460px) {
        width: calc(50% - 10px);
        margin: 10px 5px;
    }

    @media screen and (max-width: 460px) {
        width: calc(50% - 10px);
        margin: 10px 5px;
    }

    @media screen and (max-width: 460px) {
        width: calc(50% - 10px);
        margin: 10px 5px;
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    min-width: 200px;
    min-height: 300px;
`;

const DateContainer = styled.div`
    position: absolute;
    top: 0;
    margin: 0.25rem;
    border-radius: 0.25rem;
    left: 0;
    padding: 0.5rem 0.75rem;
    background-color: rgba(0, 0, 0, 0.95);
`;

const RatingContainer = styled.div`
    position: absolute;
    top: 0;
    margin: 0.25rem;
    border-radius: 0.25rem;
    right: 0;
    padding: 0.5rem 0.75rem;
    background-color: rgba(0, 0, 0, 0.95);
`;

const DetailsContainer = styled.div`
    position: absolute;
    height: 2.5rem;
    top: 0;
    right: 0;
    left: 0;
`;

const TitleContainer = styled.p`
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0.25rem 0.3rem;
    border-radius: 3px;
    padding: 0.5rem 0.75rem;
    background-color: rgba(0, 0, 0, 0.95);
`;

const RatingIcon = styled(FontAwesomeIcon).attrs({ icon: faStar })`
    color: gold;
    margin: 0 0.5rem 0 0;
`;
