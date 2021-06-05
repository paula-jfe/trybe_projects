import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.fetchUpdatedMovie = this.fetchUpdatedMovie.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      movie: {},
      loadingMovie: false,
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchUpdatedMovie(id);
  }

  async fetchUpdatedMovie(id) {
    this.setState(
      { loadingMovie: true },
      async () => {
        const movieFound = await movieAPI.getMovie(id);
        this.setState({
          movie: movieFound,
          loadingMovie: false,
        });
      },
    );
  }

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { loadingMovie, shouldRedirect, movie } = this.state;
    const loadingElement = <Loading />;
    const redirectElement = <Redirect to="/" />;

    if (shouldRedirect) {
      return redirectElement;
    }

    if (loadingMovie) {
      return loadingElement;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EditMovie;
