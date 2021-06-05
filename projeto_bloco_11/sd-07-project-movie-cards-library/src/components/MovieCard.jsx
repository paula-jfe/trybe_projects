// implement MovieCard component here

import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

class MovieCard extends React.Component {
  render() {
    const movieElement = this.props.movie;

    return (
      <div className="movie-card">
        <img className="movie-card-image" src={movieElement.imagePath} alt={movieElement.title} />
        <div className="movie-card-body">
          <h4 className="movie-card-title">{movieElement.title}</h4>
          <h5 classNAme="movie-card-subtitle">{movieElement.subtitle}</h5>
          <p className="movie-card-storyline">{movieElement.storyline}</p>
          <div className="movie-card-rating">
            <Rating rating={movieElement.rating} />
          </div>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    imagePath: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
