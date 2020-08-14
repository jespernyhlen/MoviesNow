import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';
import PlaceHolderImage from '../Images/placeholder-movieposter.png';

const Involved = ({ cast, crew }) => {
    const getInvolvedByJob = (jobType) => {
        return crew
            .filter(function (person) {
                return person.job === jobType;
            })
            .map(function (person) {
                return person.name;
            })
            .join(', ');
    };

    let directors = getInvolvedByJob('Director');
    let producers = getInvolvedByJob('Producer');
    let writers = getInvolvedByJob('Writer');
    let screenplays = getInvolvedByJob('Screenplay');

    useEffect(() => {
        let element = document.querySelectorAll('.toggle')[0];
        let BtnElements = document.querySelectorAll('.expand__btn');

        element.addEventListener('click', function () {
            element.nextElementSibling.classList.toggle('is-visible');
            if (element.nextElementSibling.classList.contains('is-visible')) {
                element.setAttribute('aria-expanded', true);
                BtnElements.forEach((BtnElement) =>
                    BtnElement.classList.toggle('hide')
                );
            } else {
                element.setAttribute('aria-expanded', false);
                BtnElements.forEach((BtnElement) =>
                    BtnElement.classList.toggle('hide')
                );
            }
        });
    }, []);

    return (
        <Wrapper>
            <ToggleHeader aria-expanded='false' className='toggle'>
                <ExpandIcon className='expand__btn plus' />
                <MinimizeIcon className='expand__btn minus hide' />
                <h3>Show people involved</h3>
            </ToggleHeader>
            <ToggleContent>
                <InvolvedContainer>
                    <InvolvedPersonsContainer>
                        <InvolvedPersons>
                            <h3>Director: </h3>
                            <p>{directors ? directors : 'Not Available'} </p>
                        </InvolvedPersons>
                        <InvolvedPersons>
                            <h3> Producer(s): </h3>
                            <p> {producers ? producers : 'Not Available'} </p>
                        </InvolvedPersons>
                        <InvolvedPersons>
                            <h3> Screenplay(s): </h3>
                            <p>{screenplays ? screenplays : 'Not Available'}</p>
                        </InvolvedPersons>
                        <InvolvedPersons>
                            <h3> Writer(s): </h3>
                            <p> {writers ? writers : 'Not Available'} </p>
                        </InvolvedPersons>
                    </InvolvedPersonsContainer>
                    <h3 style={{ padding: '0 0.5rem' }}>Actors: </h3>
                    <ActorsContainer>
                        {cast.slice(0, 16).map((person) => {
                            return (
                                <ActorCard key={person.id}>
                                    <ActorImg
                                        src={
                                            person.profile_path
                                                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                                                : PlaceHolderImage
                                        }
                                        alt={`Actor: ${person.name}`}
                                    />
                                    <TextContainer>
                                        <CharacterText>
                                            {person.character}
                                        </CharacterText>
                                        <ActorText>{person.name}</ActorText>
                                    </TextContainer>
                                </ActorCard>
                            );
                        })}
                    </ActorsContainer>
                </InvolvedContainer>
            </ToggleContent>
        </Wrapper>
    );
};

const mapsStateToProps = (state) => {
    return {
        cast: state.movie.involved.cast,
        crew: state.movie.involved.crew,
    };
};

export default connect(mapsStateToProps)(Involved);

const InvolvedContainer = styled.div`
    h3 {
        margin-bottom: 0.5rem;
    }
`;

const ActorsContainer = styled.div`
    margin: auto 0 3.5rem 0;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 5px;

    @media screen and (max-width: 1023px) {
        max-width: 100%;
        margin-bottom: 2em;
        margin-top: 1em;
    }
`;

const ActorCard = styled(animated.div)`
    flex: 0 0 24%;
    margin: 0.5%;
    display: flex;
    flex-flow: row;
    align-items: center;

    box-shadow: rgba(27, 6, 65, 0.1) 0px 1px 20px;
    background-color: #0606069c;
    border-radius: 0.5rem;

    @media only screen and (max-width: 900px) {
        flex: 0 0 31.3%;
        margin: 1%;
    }
    @media only screen and (max-width: 900px) {
        flex: 0 0 48%;
        margin: 1%;
    }
`;

const TextContainer = styled.div`
    margin: 0.5rem 0;
`;

const ActorImg = styled.img`
    border-radius: 0.5rem;
    vertical-align: top;
    max-width: 4rem;
    height: auto;
`;

const Text = styled.p`
    margin: 0.5rem 0;
`;

const CharacterText = styled(Text)`
    margin: 0.25rem 0.75rem;
`;

const ActorText = styled(CharacterText)`
    margin-top: 0;
    color: #b7b7b7;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    position: absolute;
    @media only screen and (max-width: 768px) {
        position: relative;
    }
`;

const ToggleHeader = styled.div`
    display: flex;
    width: fit-content;
    transition: all 150ms;
    h3 {
        align-self: center;
    }

    .faq__expand {
        .expand__btn {
            margin: 0;
            color: #ddd;
            line-height: 1.2rem;
            font-weight: 400;
            font-size: 1.5rem;
            display: inline;
        }
    }

    &:hover {
        cursor: pointer;
        color: #ddd;
        opacity: 0.95;

        path {
            opacity: 0.95;
        }
    }
`;

const ToggleContent = styled.div`
    overflow: hidden;
    opacity: 0;
    height: 0;
    margin: 0;
    transform: translateY(0);
    transform-origin: top;
    transition: all 150ms ease 0ms;

    &.is-visible {
        opacity: 1;
        margin-top: 15px;
        height: auto;
        transform: translateY(1);
    }
`;

const ExpandIcon = styled(FontAwesomeIcon).attrs({ icon: faPlusCircle })`
    margin: 0 0.5rem 0 0;
    width: 20px !important;
    height: 20px !important;
    margin-right: 10px;

    &.hide {
        display: none;
    }

    path {
        transition: all 150ms;
        fill: #eee;
    }
`;

const MinimizeIcon = styled(FontAwesomeIcon).attrs({ icon: faMinusCircle })`
    margin: 0 0.5rem 0 0;
    width: 20px !important;
    height: 20px !important;
    margin-right: 10px;

    &.hide {
        display: none;
    }

    path {
        transition: all 150ms;
        fill: #eee;
    }
`;

const InvolvedPersonsContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    margin: 1rem 0 2rem;

    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

const InvolvedPersons = styled.div`
    margin-right: 2rem;
    @media only screen and (max-width: 600px) {
        margin: 1rem 0;
    }
`;
