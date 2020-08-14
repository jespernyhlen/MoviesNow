// ------------ UNDER DEVELOPMENT ------------

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { withRouter } from 'react-router-dom';

// import { connect } from 'react-redux';

// import {
//     // searchMovie,
//     // setLoading,
//     // setFirstload,
//     setFilters,
//     setFilterActive,
// } from '../../actions';

// function FilterForm(props) {
//     const [searchQuery, setSearchQuery] = useState('');

//     const capitalize = (s) => {
//         if (typeof s !== 'string') return '';
//         return s.charAt(0).toUpperCase() + s.slice(1);
//     };

//     let onChange = (e) => {
//         setSearchQuery(e.target.value);
//         if (e.target.value === '') {
//             props.searchMovie(' ');
//             props.searchMovie(searchQuery);
//         }
//     };

//     let onClick = (e) => {
//         props.filterActive
//             ? props.setFilterActive(false)
//             : props.setFilterActive(true);
//     };

//     let onSubmit = (e) => {
//         e.preventDefault();
//         props.setLoading();
//         props.history.push(`/search/${searchQuery}/1`);
//     };

//     return (
//         <SearchFormContainer onSubmit={onSubmit} autoComplete='off'>
//             <FilterButton onClick={onClick} className='text-light'>
//                 <i className='fas fa-angle-down'></i> {capitalize('filter')}
//             </FilterButton>
//         </SearchFormContainer>
//     );
// }

// const mapStateToProps = (state) => ({
//     query: state.movies.query,
//     firstload: state.movies.firstload,
//     filterActive: state.movies.filterActive,
//     pathname: state.movies.pathname,
//     filters: state.movies.filters,
// });

// export default withRouter(
//     connect(mapStateToProps, {
//         // searchMovie,
//         // setLoading,
//         // setFirstload,
//         setFilters,
//         setFilterActive,
//     })(FilterForm)
// );

// const SearchFormContainer = styled.form`
//     display: flex;
//     justify-content: flex-end;
//     top: 0.72em;
//     right: 0;
//     left: 0;
//     max-width: 1620px;
//     z-index: 200;
//     margin: 0 auto;
//     padding: 0 0 0 15px;

//     @media only screen and (max-width: 790px) {
//         display: flex;
//         justify-content: center;
//         background: rgba(0, 0, 0, 0.96);
//         right: 0;
//         left: 0;
//         position: absolute;
//         height: 3.6em;
//         padding: 0.5em;
//         top: 0;
//     }
// `;

// const FormInput = styled.input`
//     border: 0 !important;
//     z-index: 200;
//     color: #aaa;
//     border-radius: 0;
//     font-size: 1.4em;
//     background: rgba(187, 193, 191, 0.27);
//     width: 320px;
//     max-width: 410px;

//     &:focus {
//         border: 0;
//         z-index: 200;
//         background: #bbc1bf45;
//         border-radius: 0;
//         color: #aaa;
//         box-shadow: 0 1px 20px rgba(0, 0, 0, 0.04);
//         border: 2px solid #555;
//         outline: 0;
//     }
//     @media only screen and (max-width: 790px) {
//         height: 2.4em;
//         font-size: 1.1em !important;
//     }
// `;

// const FilterButton = styled.div`
//     color: rgba(255, 255, 255, 0.77) !important;
//     font-size: 1.3em;
//     font-weight: 400;
//     border: 0;
//     border-radius: 0;
//     border-top-left-radius: 4px;
//     border-bottom-left-radius: 4px;
//     padding: 0.4em 1.4em 0.22em;
//     margin-right: 4px;
//     letter-spacing: 1px;
//     cursor: pointer;
//     transition: 0.2s all;

//     &:hover {
//         color: #fff !important;
//     }

//     @media only screen and (max-width: 790px) {
//         font-size: 1.1em;
//         padding: 0.4em 0.5em 0.22em 0.5em;
//         display: flex;
//         line-height: 1.65em;

//         i {
//             padding: 0.5em 0.5em 0 0;
//         }
//     }
// `;

// const SearchButton = styled.button`
//     background: #f90f1c73;
//     color: rgba(255, 255, 255, 0.77) !important;
//     font-size: 1.5em;
//     font-weight: 400;
//     border: 0;
//     border-radius: 0;
//     border-top-right-radius: 4px;
//     border-bottom-right-radius: 4px;
//     padding: 0.18em 0.75em 0.22em;
//     margin-left: 3px;
//     letter-spacing: 1px;
//     text-transform: uppercase;
//     transition: 0.2s all;

//     @media only screen and (max-width: 790px) {
//         font-size: 1.2em;
//         padding: 0em 1em 0em;
//         height: 2.2em;
//     }

//     &:hover {
//         color: rgba(227, 227, 227, 0.85) !important;

//         background: #f90f1c8f;
//     }

//     &:focus {
//         outline: none;
//     }
// `;
