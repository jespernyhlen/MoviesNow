// ------------ UNDER DEVELOPMENT ------------

// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { connect } from 'react-redux';

// import Filter from '../components/Forms/Filter';
// import MoviesContainer from '../components/Movies/MoviesContainer';
// import Pagination from '../components/Layout/Pagination';

// import { filterMovies } from '../actions';

// function FilterMovies(props) {
//     let fullPath = props.location.pathname.split('/');
//     let pathName = fullPath[1];
//     let pageNr = fullPath[2];

//     useEffect(() => {
//         props.filterMovies(pageNr, props.filters);
//     }, [pathName, pageNr]);

//     return (
//         <FilterContainer className='container'>
//             <Filter hej='hey' />
//             <MoviesContainer pathName={pathName} pageNr={pageNr} />
//             <Pagination pathName={pathName} totalPages={props.totalPages} />
//         </FilterContainer>
//     );
// }

// const mapStateToProps = (state) => ({
//     pathname: state.movies.pathname,
//     totalPages: state.movies.totalPages,
//     filters: state.movies.filters,
// });

// export default connect(mapStateToProps, {
//     filterMovies,
// })(FilterMovies);

// const FilterContainer = styled.div`
//     padding-bottom: 6em;
//     padding-top: 8em;
//     max-width: 100vw;

//     @media only screen and (max-width: 790px) {
//         padding-top: 6em;
//         max-width: 95vw;
//     }
// `;
