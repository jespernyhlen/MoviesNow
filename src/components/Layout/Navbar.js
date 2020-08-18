import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNavOpen, setPage, setFilters, setFilterOpen } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import Searchbar from './Searchbar';
import Filter from '../Forms/Filter';
import Logo from '../Images/logo.png';

const Navbar = ({
    setPage,
    movieOpen,
    setNavOpen,
    navOpen,
    filterOpen,
    setFilterOpen,
}) => {
    let handleClick = (e) => {
        setNavOpen(!navOpen);
        let rootElement = document.querySelectorAll('#root')[0];
        rootElement.classList.toggle('navigation-open');
    };

    let resetPagination = () => {
        setPage(1);
    };

    let onClick = (e) => {
        filterOpen ? setFilterOpen(false) : setFilterOpen(true);
    };
    return (
        <>
            <StyledNavbar className={movieOpen ? 'hide-bar' : ''}>
                <LeftContainer>
                    <NavLogoContainer>
                        <NavLink
                            to='/trending'
                            onClick={() => resetPagination()}
                        >
                            <NavImg src={Logo} alt='Website Logo' />
                        </NavLink>
                    </NavLogoContainer>
                    <StyledLink
                        className='desktop'
                        exact
                        to='/trending'
                        onClick={() => resetPagination()}
                    >
                        Trending Movies
                    </StyledLink>
                    <StyledLink
                        className='desktop'
                        to='/upcoming'
                        onClick={() => resetPagination()}
                    >
                        Upcoming Movies
                    </StyledLink>
                </LeftContainer>
                <RightContainer className={navOpen ? 'hide' : ''}>
                    <FilterButton onClick={onClick}>
                        <FilterIcon />
                        Filter
                    </FilterButton>
                    <Filter />

                    <Searchbar />
                </RightContainer>
                <Hamburger
                    id='hamburger-menu'
                    className={navOpen ? 'open' : ''}
                    onClick={(e) => handleClick(e)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </Hamburger>
            </StyledNavbar>

            {navOpen ? (
                <NavContentMobile
                    id='navcontent-mobile'
                    className={navOpen ? 'open' : ''}
                >
                    <StyledLinkMobile
                        exact
                        to='/trending'
                        onClick={(e) => handleClick(e)}
                    >
                        Trending Movies
                    </StyledLinkMobile>
                    <StyledLinkMobile
                        to='/upcoming'
                        onClick={(e) => handleClick(e)}
                    >
                        Upcoming Movies
                    </StyledLinkMobile>
                </NavContentMobile>
            ) : null}
        </>
    );
};

const mapStateToProps = (state) => ({
    movieOpen: state.movie.isOpen,
    navOpen: state.navigation.isOpen,
    filterOpen: state.filter.filterOpen,
});

export default connect(mapStateToProps, {
    setNavOpen,
    setPage,
    setFilters,
    setFilterOpen,
})(Navbar);

const FilterButton = styled.div`
    font-size: 1.05em;
    font-weight: 400;
    padding: 0 0.5em 0.1em;
    margin: auto 1em;
    opacity: 75%;
    cursor: pointer;
    transition: 0.2s all;

    &:hover {
        opacity: 100%;
    }

    @media only screen and (max-width: 667px) {
        font-size: 1.3em;
        margin: auto 0 auto 0.5em;
        min-width: 65px;
    }
`;

const FilterIcon = styled(FontAwesomeIcon).attrs({ icon: faSlidersH })`
    color: white;
    text-align: center;
    margin-right: 0.5rem;
`;

const StyledLink = styled(NavLink)`
    color: #ccc;
    border: none;
    background: none;
    margin: auto 1em;
    padding: 0 0.5em 0.1em;
    outline: none;
    text-decoration: none;
    font-size: 1.05em;
    font-weight: 400;
    opacity: 75%;

    transition: all 0.2s ease-in-out;

    &.active {
        color: #fff;
        opacity: 100%;
    }

    :hover {
        cursor: pointer;
        opacity: 100%;
    }

    @media only screen and (max-width: 667px) {
        padding: 0 0.5em 0.1em;
        margin: 2rem 0 0;
        font-size: 2rem;
    }
`;

const LeftContainer = styled.div`
    display: flex;
    margin-left: 1rem;

    @media only screen and (max-width: 667px) {
        margin-left: 0;
    }
`;

const RightContainer = styled.div`
    display: flex;

    &.hide {
        transform: translateY(-50vh) !important;
    }

    @media only screen and (max-width: 667px) {
        position: absolute;
        top: 4.2rem;
        width: 100%;
        left: 0;
        background: #0e0e0e;
    }
`;

const StyledNavbar = styled.nav`
    display: flex;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.9);
    opacity: 1;
    padding: 0.5rem 1.5rem;
    transition: 0.5s transform, 0.5s opacity;

    &.hide-bar {
        transform: translateY(-50vh) !important;
    }

    @media only screen and (max-width: 667px) {
        .desktop {
            display: none;
        }
        padding: 0.5rem 0.5rem;
        background: #0e0e0e;
    }

    /* @media only screen and (max-width: 667px) {
        display: none;
    } */
`;

const NavLogoContainer = styled.div``;

const NavImg = styled.img`
    height: 3rem;

    @media only screen and (max-width: 667px) {
        width: 100px;
    }
`;

const NavContentMobile = styled.div`
    display: none;

    &.open {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10rem 2rem;
        height: 100vh;
        width: 100vw;
        text-align: center;
        z-index: 9;
        background: #1e1f26;

        @media only screen and (min-width: 667px) {
            display: none;
        }
    }
`;

const Hamburger = styled.div`
    display: none;
    width: 25px;
    height: 20px;
    position: relative;
    margin: auto 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
    margin-right: 0.5rem;

    span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: #d3531a;
        border-radius: 3px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.25s ease-in-out;
        -moz-transition: 0.25s ease-in-out;
        -o-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;
    }

    span:nth-child(1) {
        top: 0px;
    }

    span:nth-child(2),
    span:nth-child(3) {
        top: 8px;
    }

    span:nth-child(4) {
        top: 16px;
    }

    &.open span:nth-child(1) {
        top: 8px;
        width: 0%;
        left: 50%;
    }

    &.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    &.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    &.open span:nth-child(4) {
        top: 8px;
        width: 0%;
        left: 50%;
    }

    @media only screen and (max-width: 667px) {
        display: block;
    }
`;

const StyledLinkMobile = styled(StyledLink)`
    padding: 0 0.5em 0.1em;
    margin: 2rem 0 0;
    font-size: 2rem;
`;
