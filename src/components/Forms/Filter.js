import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter, useHistory } from 'react-router-dom';
import GenreSelect from './GenreSelect';
import YearSlider from './YearSlider';
import VoteSlider from './VoteSlider';

import {
    setFilters,
    fetchMoviesFilter,
    setFilterOpen,
    resetFilters,
} from '../../actions';

function Filter({
    setFilters,
    filterOpen,
    setFilterOpen,
    filters,
    resetFilters,
}) {
    const history = useHistory();

    const [values, setValues] = useState({
        yearFilter: [],
        voteFilter: [],
        genreFilter: {},
    });

    const handleChange = (newValue, name) => {
        setValues({ ...values, [name]: newValue });
    };

    useEffect(() => {
        setValues({
            yearFilter: filters.yearFilter,
            voteFilter: filters.voteFilter,
            genreFilter: filters.genreFilter,
        });
    }, []);

    useEffect(() => {
        if (filterOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            if (filterOpen) {
                document.body.style.overflow = '';
            }
        };
    }, [filterOpen]);

    let handleSubmit = (e) => {
        setFilters(values);
        setFilterOpen(false);

        history.push('/filter');
    };

    let clearFilters = () => {
        resetFilters(true);
        setFilters({
            yearFilter: [],
            voteFilter: [],
            genreFilter: {},
        });
    };

    return (
        <FilterContainer className={filterOpen === true ? 'filter-active' : ''}>
            <ContainerCenter>
                <div style={{ width: '100%' }}>
                    <HeaderText>Find movies based on these filters</HeaderText>
                    <SubHeaderText>
                        (Further search and navigation do not take filters in
                        consideration)
                    </SubHeaderText>

                    <>
                        <YearSlider onChange={handleChange} />
                        <VoteSlider onChange={handleChange} />
                        <GenreSelect onChange={handleChange} />
                    </>

                    <ButtonsContainer>
                        <Button green onClick={handleSubmit}>
                            Apply Filters
                        </Button>
                        <Button red onClick={clearFilters}>
                            Clear
                        </Button>
                    </ButtonsContainer>
                    <div>
                        <ButtonClose
                            onClick={() => {
                                setFilterOpen(false);
                            }}
                        >
                            Close
                        </ButtonClose>
                    </div>
                </div>
            </ContainerCenter>
        </FilterContainer>
    );
}

const mapStateToProps = (state) => ({
    filterOpen: state.filter.filterOpen,
    filters: state.filter.filters,
    loading: state.movies.loading,
});

export default withRouter(
    connect(mapStateToProps, {
        setFilters,
        fetchMoviesFilter,
        setFilterOpen,
        resetFilters,
    })(Filter)
);

const ButtonsContainer = styled.div`
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 790px) {
        width: 90%;
    }
`;

const FilterContainer = styled.div`
    background: #000000f0;
    height: 100vh;
    width: 100%;
    padding: 5em 15px 2em;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: -110vh;
    transition: 0.5s all ease-in-out;
    margin-bottom: 0.75em;
    z-index: 800;
    position: fixed;

    &.filter-active {
        top: 0;
    }

    @media only screen and (max-width: 800px) {
        overflow: scroll;
        padding: 2em 15px 2em;
    }
`;

const ContainerCenter = styled.div`
    position: absolute;
    height: 100vh;
    max-width: 1440px;
    top: -4em;
    place-items: center center;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    transition: 0.6s all ease-in-out;

    @media only screen and (max-width: 800px) {
        font-size: 0.9em;
        top: 0;
    }
`;

const HeaderText = styled.h4`
    color: #eee;
    font-size: 1.8em;
    font-weight: 300;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 0.75em;

    @media only screen and (max-width: 800px) {
        font-size: 1.6em;
        top: 2.5em;
    }
`;

const SubHeaderText = styled.p`
    color: #ccc;
    font-size: 1em;
    font-weight: 300;
    letter-spacing: 1px;
    text-align: center;
    font-style: italic;

    @media only screen and (max-width: 800px) {
        font-size: 1.3em;
        top: 2.5em;
    }
`;

const Button = styled.div`
    font-size: 1.5em;
    font-weight: 400;
    border: 0;
    border-radius: 5px;
    padding: 0.5em 0.75em 0.5em;
    letter-spacing: 1px;
    width: 10em;
    text-align: center;
    cursor: pointer;
    margin: 2em 0;
    transition: 0.3s all;
    border: 2px solid ${(props) => (props.red ? '#c53a4285' : '#2dc95973')};
    color: ${(props) => (props.red ? '#c53a42a1' : '#3cd7679c')} !important;

    &:hover {
        border: 2px solid ${(props) => (props.red ? '#c53a42cf' : '#2dc959bd')};
        color: ${(props) => (props.red ? '#c53a42f7' : '#3cd767')} !important;
    }

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: 800px) {
        padding: 1em 0.75em 1em;
        font-size: 1.4em;
        width: 48%;
        margin: 2.5em 0;
    }
`;

const ButtonClose = styled.p`
    color: #ccc;
    position: absolute;
    left: 0;
    right: 0;
    font-size: 1.4em;
    font-weight: 300;
    letter-spacing: 0.5px;
    text-align: center;
    cursor: pointer;

    &:hover {
        color: #fff;
    }
`;
