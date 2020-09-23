import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovie } from '../actions';

import Details from '../components/Moviedetails/Details';
import Loader from '../components/Extra/Loader';

const FullMovieDetails = (props) => {
    const { movie, fetchMovie, fetchError, isLoading } = props;

    let movieID = props.match.params.id;

    useEffect(() => {
        fetchMovie(movieID);
    }, [fetchMovie, movieID]);

    let { path } = useRouteMatch();
    return (
        <>
            {fetchError && <p>An error occured, please try again.</p>}
            {isLoading && movie ? (
                <Loader />
            ) : (
                <>
                    <Switch>
                        <Route path={`${path}/details`}>
                            <Details />
                        </Route>
                    </Switch>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        movie: state.movie.movie,
        images: state.movie.images,
        fetchError: state.movies.fetchError,
        isLoading: state.movie.isLoading,
    };
};

export default connect(mapStateToProps, { fetchMovie })(FullMovieDetails);
