// implement Rating component here

import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const ratingValue = this.props.rating;

    return (
      <span className="rating">{ratingValue}</span>
    );
  }
}

Rating.propTypes = { rating: PropTypes.number.isRequired };

export default Rating;
