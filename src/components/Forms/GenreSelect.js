// ------------ UNDER DEVELOPMENT ------------

// import React, { Component } from 'react';
// import styled from 'styled-components';
// import { withRouter } from 'react-router-dom';
// import Select from 'react-select';
// import { connect } from 'react-redux';

// import './select.css';

// class GenreSelect extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             select: {
//                 value: this.props.filters.genreFilter.label
//                     ? this.props.filters.genreFilter
//                     : options[0], // "One" as initial value for react-select
//                 options, // all available options
//             },
//         };
//     }
//     setValue = (value) => {
//         this.setState((prevState) => ({
//             select: {
//                 value,
//                 options,
//             },
//         }));
//     };
//     handleChange = (value) => {
//         this.setValue(value);
//         console.log(this.state);
//     };

//     componentDidUpdate() {
//         if (this.props.resetFilters) {
//             this.setValue(null);
//         }
//     }
//     render() {
//         const { select } = this.state;

//         let colourStyles = {
//             control: (styles) => ({ ...styles, backgroundColor: 'white' }),
//             option: (styles, { isDisabled, isFocused }) => {
//                 return {
//                     ...styles,
//                     backgroundColor: isFocused ? '#eee' : '#fff',
//                     color: '#222',
//                     cursor: isDisabled ? 'not-allowed' : 'default',
//                     textAlign: 'left',
//                 };
//             },
//         };
//         return (
//             <div
//                 id='genre-select'
//                 style={{ maxWidth: '700px', margin: '2em auto 0' }}
//             >
//                 <LabelContainer>
//                     <label>Genre</label>
//                 </LabelContainer>
//                 <SelectContainer>
//                     <Select
//                         styles={colourStyles}
//                         className='genre-select'
//                         value={select.value}
//                         options={select.options}
//                         onChange={(e) => {
//                             this.handleChange(e);
//                             this.props.onChange(e, 'genreFilter');
//                         }}
//                     />
//                 </SelectContainer>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     filters: state.movies.filters,
//     resetFilters: state.movies.resetFilters,
// });

// export default withRouter(connect(mapStateToProps)(GenreSelect));

// const LabelContainer = styled.div`
//     color: #ccc;
//     font-weight: 600;
//     font-size: 1.6em;
//     @media only screen and (max-width: 790px) {
//         font-size: 1.2em !important;
//     }
// `;

// const SelectContainer = styled.div`
//     @media only screen and (max-width: 790px) {
//         width: 90%;
//         margin: 0 auto;
//     }
// `;

// const options = [
//     {
//         type: '',
//         label: 'All',
//     },
//     {
//         type: 28,
//         label: 'Action',
//     },
//     {
//         type: 12,
//         label: 'Adventure',
//     },
//     {
//         type: 16,
//         label: 'Animation',
//     },
//     {
//         type: 35,
//         label: 'Comedy',
//     },
//     {
//         type: 80,
//         label: 'Crime',
//     },
//     {
//         type: 99,
//         label: 'Documentary',
//     },
//     {
//         type: 18,
//         label: 'Drama',
//     },
//     {
//         type: 10751,
//         label: 'Family',
//     },
//     {
//         type: 14,
//         label: 'Fantasy',
//     },
//     {
//         type: 36,
//         label: 'History',
//     },
//     {
//         type: 27,
//         label: 'Horror',
//     },
//     {
//         type: 10402,
//         label: 'Music',
//     },
//     {
//         type: 9648,
//         label: 'Mystery',
//     },
//     {
//         type: 10749,
//         label: 'Romance',
//     },
//     {
//         type: 878,
//         label: 'Science Fiction',
//     },
//     {
//         type: 10770,
//         label: 'TV Movie',
//     },
//     {
//         type: 53,
//         label: 'Thriller',
//     },
//     {
//         type: 10752,
//         label: 'War',
//     },
//     {
//         type: 37,
//         label: 'Western',
//     },
// ];
