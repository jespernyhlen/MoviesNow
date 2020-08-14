// ------------ UNDER DEVELOPMENT ------------

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { withRouter, useHistory } from 'react-router-dom';
// import GenreSelect from './GenreSelect';
// import YearSlider from './YearSlider';
// import VoteSlider from './VoteSlider';

// import { connect } from 'react-redux';
// import { setFilters, filterMovies, setFilterActive } from '../../actions';

// function Filter(props) {
//     const history = useHistory();
//     const [yearFilter, setYearFilter] = useState([]);
//     const [voteFilter, setVoteFilter] = useState([]);
//     const [genreFilter, setGenreFilter] = useState({});

//     useEffect(() => {
//         setYearFilter(props.filters.yearFilter);
//         setVoteFilter(props.filters.voteFilter);
//         setGenreFilter(props.filters.genreFilter);
//         return () => {};
//     }, []);

//     let handleSubmit = (e) => {
//         let currentFilters = {
//             yearFilter: yearFilter,
//             voteFilter: voteFilter,
//             genreFilter: genreFilter,
//         };
//         props.setFilters(currentFilters);
//         props.filterMovies(1, currentFilters);

//         history.push('/filter');
//         props.setFilterActive(false);
//     };

//     let handleYearChange = (e) => {
//         setYearFilter(e);
//         console.log(e);
//     };

//     let handleVoteChange = (e) => {
//         setVoteFilter(e);
//         console.log(e);
//     };

//     let handleGenreChange = (e) => {
//         setGenreFilter(e);
//         console.log(e);
//     };

//     let clearFilters = () => {
//         props.setReset(true);
//         props.setFilters({
//             yearFilter: [],
//             voteFilter: [],
//             genreFilter: {},
//         });
//     };

//     return (
//         <FilterContainer
//             className={`filter-container jumbotron jumbotron-fluid text-center ${
//                 props.filterActive === true ? 'filter-active' : ''
//             }`}
//         >
//             {' '}
//             <ContainerCenter>
//                 <div style={{ width: '100%' }}>
//                     <HeaderText>Find movies based on these filters</HeaderText>
//                     <React.Fragment>
//                         <YearSlider onChange={handleYearChange} />
//                         <VoteSlider onChange={handleVoteChange} />
//                         <GenreSelect onChange={handleGenreChange} />
//                     </React.Fragment>

//                     <ButtonsContainer>
//                         <Button green onClick={handleSubmit}>
//                             Apply Filters
//                         </Button>
//                         <Button red onClick={clearFilters}>
//                             Clear
//                         </Button>
//                     </ButtonsContainer>
//                     <div>
//                         <ButtonClose
//                             onClick={() => {
//                                 props.setFilterActive(false);
//                             }}
//                         >
//                             Close
//                         </ButtonClose>
//                     </div>
//                 </div>
//             </ContainerCenter>
//         </FilterContainer>
//     );
// }

// const mapStateToProps = (state) => ({
//     filterActive: state.movies.filterActive,
//     filters: state.movies.filters,
//     loading: state.movies.loading,
// });

// export default withRouter(
//     connect(mapStateToProps, {
//         setFilters,
//         filterMovies,
//         setFilterActive,
//     })(Filter)
// );

// const ButtonsContainer = styled.div`
//     max-width: 700px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: space-between;

//     @media only screen and (max-width: 790px) {
//         width: 90%;
//     }
// `;

// const FilterContainer = styled.div`
//     background: #000000f0;
//     height: 100vh;
//     width: 100%;
//     padding: 5em 15px 2em;
//     left: 0;
//     right: 0;
//     margin: 0 auto;
//     top: -110vh;
//     transition: 0.5s all ease-in-out;
//     margin-bottom: 0.75em;
//     z-index: 800;
//     position: fixed;

//     &.filter-active {
//         top: 0;
//     }

//     @media only screen and (max-width: 600px) {
//         overflow: scroll;
//     }
// `;

// const ContainerCenter = styled.div`
//     position: absolute;
//     height: 100vh;
//     max-width: 1440px;
//     top: -4em;
//     place-items: center center;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     margin: 0 auto;
//     left: 0;
//     right: 0;
//     display: flex;
//     justify-content: center;
//     transition: 0.6s all ease-in-out;

//     @media only screen and (max-width: 600px) {
//         font-size: 0.9em;
//         top: 0;
//     }
// `;

// const HeaderText = styled.div`
//     color: rgb(238, 238, 238);
//     font-size: 1.8em;
//     font-weight: 300;
//     letter-spacing: 1px;

//     @media only screen and (max-width: 790px) {
//         font-size: 1.3em !important;
//         top: 2.5em;
//     }
// `;

// const Button = styled.div`
//     font-size: 1.5em;
//     font-weight: 400;
//     border: 0;
//     border-radius: 5px;
//     padding: 0.5em 0.75em 0.5em;
//     letter-spacing: 1px;
//     width: 10em;
//     cursor: pointer;
//     margin: 2em 0;
//     transition: 0.3s all;
//     border: 2px solid ${(props) => (props.red ? '#c53a4285' : '#2dc95973')};
//     color: ${(props) => (props.red ? '#c53a42a1' : '#3cd7679c')} !important;

//     &:hover {
//         border: 2px solid ${(props) => (props.red ? '#c53a42cf' : '#2dc959bd')};
//         color: ${(props) => (props.red ? '#c53a42f7' : '#3cd767')} !important;
//     }

//     &:focus {
//         outline: none;
//     }

//     @media only screen and (max-width: 790px) {
//         font-size: 1.2em;
//         width: 48%;
//         margin: 2.5em 0;
//     }
// `;

// const ButtonClose = styled.p`
//     color: #ccc;
//     position: absolute;
//     left: 0;
//     right: 0;
//     font-size: 1.2em;
//     font-weight: 300;
//     letter-spacing: 0.5px;
//     cursor: pointer;

//     &:hover {
//         color: #fff;
//     }
// `;
