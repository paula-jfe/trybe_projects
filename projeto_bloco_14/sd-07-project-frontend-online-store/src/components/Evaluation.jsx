import React from 'react';
// import * as api from '../services/api';

class Evaluation extends React.Component {
  constructor() {
    super();

    this.state = {
      evaluationText: '',
      rating: 0,
      reviewList: [],
      reviewRating: 0,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
  }

  // componentDidMount() {
  //   this.fetchReviews();
  // }

  onChangeHandler(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  // async fetchReviews() {
  //   const { productId } = this.props;
  //   const requestReview = await api.getReviews(productId);
  //   const { reviews } = requestReview;
  //   const { rating_average: ratingAverage} = requestReview;

  //   this.setState({
  //     reviewList: reviews,
  //     reviewRating: ratingAverage,
  //   })
  // }

  renderReviews() {
    const { reviewList } = this.state;
    return (
      <div>
        <h3>Comentários</h3>
        {
          reviewList.map((review) => (
            <div key={ review.id }>
              <h4>{ review.title }</h4>
              <p>{ review.content }</p>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const { evaluationText, rating, reviewList, reviewRating } = this.state;

    return (
      <div>
        <form>
          <p>Avaliação</p>
          <textarea
            value={ evaluationText }
            id="evaluationText"
            cols="30"
            rows="5"
            placeholder="Comentário (opcional)"
            onChange={ this.onChangeHandler }
            data-testid="product-detail-evaluation"
          />
          <br />
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={ rating }
            id="rating"
            onChange={ this.onChangeHandler }
            data-testid="rating-input"
          />
          <button type="button">Avaliar</button>
        </form>
        <br />
        <span>{ `Média de opiniões: ${reviewRating}` }</span>
        { !reviewList.length ? <h3>Sem Comentários</h3> : this.renderReviews()}
      </div>
    );
  }
}

export default Evaluation;
