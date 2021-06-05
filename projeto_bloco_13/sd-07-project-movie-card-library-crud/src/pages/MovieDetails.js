import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class MovieDetails extends Component {
  constructor() {
    super();
    this.fetchMovieDetail = this.fetchMovieDetail.bind(this);
    this.state = {
      movie: {},
      loadingDetail: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchMovieDetail(id);
  }

  async fetchMovieDetail(id) {
    this.setState(
      { loadingDetail: true },
      async () => {
        const movieFound = await movieAPI.getMovie(id);
        this.setState({
          movie: movieFound,
          loadingDetail: false,
        });
      },
    );
  }

  async deleteMovie(id) {
    await movieAPI.deleteMovie(id);
  }

  render() {
    const { movie, loadingDetail } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle, id } = movie;
    const loadingElement = <Loading />;

    if (loadingDetail) {
      return loadingElement;
    }

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={`../${imagePath}`} />
        <p>{`Title: ${title}`}</p>
        <p>{`Subtitle: ${subtitle}`}</p>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating: ${rating}`}</p>
        <Link to={`/movies/${id}/edit`}>EDITAR</Link>
        <Link to={'/'}>VOLTAR</Link>
        <Link to={'/'} onClick={() => this.deleteMovie(id)}>DELETAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MovieDetails;
