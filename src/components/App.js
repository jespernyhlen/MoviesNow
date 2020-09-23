import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import Navbar from '../components/Layout/Navbar';
import FilterMovies from '../pages/FilterMovies';
import TrendingMovies from '../pages/TrendingMovies';
import TopratedMovies from '../pages/TopratedMovies';
import IntheatresMovies from '../pages/IntheatresMovies';
import UpcomingMovies from '../pages/UpcomingMovies';
import SearchMovies from '../pages/SearchMovies';
import FullDetailsMovie from '../pages/FullDetailsMovie';
import Pagination from '../components/Layout/Pagination';

import './App.css';

require('dotenv').config();

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Navbar />
            <Switch>
                <Redirect exact from='/' to='/trending' />
                <Route exact path='/trending' component={TrendingMovies} />
                <Route exact path='/toprated' component={TopratedMovies} />
                <Route exact path='/upcoming' component={UpcomingMovies} />
                <Route exact path='/intheatres' component={IntheatresMovies} />

                <Route exact path='/search' component={SearchMovies} />
                <Route exact path='/filter' component={FilterMovies} />
                <Route
                    path={[
                        '/trending/:id',
                        '/toprated/:id',
                        '/intheatres/:id',
                        '/upcoming/:id',
                        '/search/:id',
                        '/filter/:id',
                    ]}
                    component={FullDetailsMovie}
                />
            </Switch>
            <Pagination />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        type: state.movies.type,
        page: state.movies.page,
    };
};

export default withRouter(connect(mapStateToProps)(App));

const GlobalStyle = createGlobalStyle`
  ${normalize}

  *,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 100%;
  
  @media screen and (max-width: 1601px) {
    font-size: 80%;
  }

  @media screen and (max-width: 1023px) {
    font-size: 62.5%;
  }
}

  body {
    font-family: "Lato", sans-serif;  
    /* background-color: #1e1f26; */
    /* background: #0e1217; */
    background: linear-gradient(145deg, #19202b, #6C8FC7);
    box-sizing: border-box;
    color: white;
    min-height: 100vh;
  }

  #root {
    &.navigation-open {
      max-height: 100vh;
    overflow-y: hidden;
    }
  }
`;
