import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSearchMovies } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Searchbar = ({ type, page, fetchSearchMovies, searchQuery }) => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(
        type === 'search' ? page : 1
    );
    const location = useLocation();
    const history = useHistory();

    let currentPath = location.pathname;

    const handleSearchSubmit = (event, query) => {
        event.preventDefault();

        if (currentPath === '/search') {
            return fetchSearchMovies(currentPage, query);
        } else {
            fetchSearchMovies(currentPage, query);
            return history.push('/search');
        }
    };

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    useEffect(() => {
        setPage(1);
        return () => {
            setPage(1);
        };
    }, [searchQuery, query]);

    useEffect(() => {
        if (searchQuery && currentPath === '/search') {
            fetchSearchMovies(currentPage, query);
        }
    }, [currentPage, fetchSearchMovies, searchQuery, currentPath, query]);

    let setPage = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Form onSubmit={(e) => handleSearchSubmit(e, query)}>
                <StyledInput
                    type='text'
                    placeholder='Search movie..'
                    name='search'
                    autoComplete='off'
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <StyledButton type='submit'>
                    <SearchIcon />
                </StyledButton>
            </Form>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        type: state.movies.type,
        page: state.movies.page,
        searchQuery: state.movies.searchQuery,
    };
};

export default connect(mapStateToProps, { fetchSearchMovies })(Searchbar);

const Form = styled.form`
    @media only screen and (max-width: 667px) {
        display: flex;
        justify-content: center;
        width: 100vw;
        padding: 0.5rem 0.6rem 0.6rem;
    }
`;

const StyledInput = styled.input`
    width: 15rem;
    height: 2rem;
    transition: all 0.4s ease-in-out;
    background: #151c24;
    padding: 0.5em 1em;
    border: 1px solid black;
    border-radius: 0.125em;
    outline: none;
    color: #fff;
    margin-left: 1em;
    height: 100%;

    :focus {
        border-color: #2769b4;
    }
    ::placeholder {
        color: #aaa;
    }

    @media only screen and (max-width: 667px) {
        height: 4rem;
        width: 100%;
        font-size: 1.3rem;
        margin-left: 0;
    }
`;

const StyledButton = styled.button`
    width: 2.75rem;
    border-radius: 0.125em;
    border: 0;
    margin: 0 1em 0 0em;
    background: #b55500;
    outline: none;
    transition: all 300ms ease-in-out;
    color: white;
    height: 3rem;
    transform: scale(1.06) translateY(0.5px) translateX(-1px);

    :hover {
        cursor: pointer;
        transform: scale(1.1);
        background: #8a4601;
        color: black;
        border-radius: 10%;
    }

    @media only screen and (max-width: 667px) {
        height: 4rem;
        width: 5.5em;
        margin: 0;
    }
`;

const SearchIcon = styled(FontAwesomeIcon).attrs({ icon: faSearch })`
    color: white;
    text-align: center;
    font-size: 0.85em;
`;
