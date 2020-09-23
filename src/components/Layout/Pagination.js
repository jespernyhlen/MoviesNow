import React from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../actions';
import styled from 'styled-components';

const Pagination = ({ movieOpen, setPage, totalPages, page, navOpen }) => {
    let setPagination = () => {
        let paginationLinks = [];
        let pagesTotal = totalPages ? totalPages : 0;
        let nextPages;
        let startPage = 1;

        if (page > 4) {
            startPage = page === 2 ? page : page - 1;

            let paginateFirstDots = page - 4 < 0 ? true : false;

            paginationLinks.push(
                <React.Fragment key='paginationfirst'>
                    <PaginationLink onClick={() => setPage(page - 1)}>
                        {'<  '}
                    </PaginationLink>
                    <PaginationLink
                        className={page === 1 ? 'active' : ''}
                        onClick={() => setPage(1)}
                    >
                        {'1'}
                    </PaginationLink>
                    <PaginationDots className={paginateFirstDots ? 'hide' : ''}>
                        {'. .'}
                    </PaginationDots>
                </React.Fragment>
            );
        }

        nextPages = page + 5 <= pagesTotal ? page + 5 : pagesTotal;

        for (startPage; startPage < nextPages; startPage++) {
            let currentPage = startPage;
            paginationLinks.push(
                <PaginationLink
                    key={startPage}
                    className={page === startPage ? 'active' : ''}
                    onClick={() => setPage(currentPage)}
                >
                    {startPage}
                </PaginationLink>
            );
        }

        let paginateLastDots = page + 6 > pagesTotal ? true : false;
        if (page !== 0 && page === pagesTotal) paginateLastDots = true;

        paginationLinks.push(
            <React.Fragment key='pagination'>
                <PaginationDots className={paginateLastDots ? 'hide' : ''}>
                    {'. .'}
                </PaginationDots>

                <PaginationLink
                    className={page === totalPages ? 'active' : ''}
                    onClick={() => setPage(totalPages)}
                >
                    {totalPages}
                </PaginationLink>
                {page !== pagesTotal && pagesTotal !== 0 ? (
                    <PaginationLink onClick={() => setPage(page + 1)}>
                        {' >'}
                    </PaginationLink>
                ) : null}
            </React.Fragment>
        );
        return paginationLinks;
    };
    return (
        <PaginationLinks className={navOpen || movieOpen ? 'hide' : ''}>
            {setPagination()}
        </PaginationLinks>
    );
};

const mapStateToProps = (state) => ({
    type: state.movies.type,
    page: state.movies.page,
    totalPages: state.movies.totalPages,
    navOpen: state.navigation.isOpen,
    movieOpen: state.movie.isOpen,
});

export default connect(mapStateToProps, { setPage })(Pagination);

const PaginationLinks = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 0 !important;
    /* background: rgba(0, 0, 0, 0.9); */
    background: #111;

    transition: 0.3s;

    &:hover {
        /* background: rgba(0, 0, 0, 0.95) !important; */
        /* background: linear-gradient(245deg, #06060c, #0f0e1b); */
    }

    &.hide {
        display: none;
    }

    @media only screen and (max-width: 790px) {
        overflow: scroll;
    }

    @media only screen and (max-width: 667px) {
        background: #0e0e0e;
    }

    @media only screen and (max-width: 460px) {
        justify-content: flex-start;
        padding: 0 1.5rem;
    }
`;

const PaginationLink = styled.p`
    margin: 8px 2.5px;
    color: #ddd;
    align-self: center;
    font-size: 1.2rem;
    padding: 6px 12px;
    line-height: 1.42857143;
    text-decoration: none;
    background-color: #333;
    border: 0;
    border-radius: 3px;
    transition: 0.15s all;
    &.active {
        color: #fff;
        background: #b55500;
    }

    &:hover {
        background: #8a4601;
        color: #bbb;
        cursor: pointer;
    }
`;

const PaginationDots = styled.div`
    margin: 0.4em;
    font-size: 20px;
    min-width: 12.5px;

    &.hide {
        display: none;
    }
`;
