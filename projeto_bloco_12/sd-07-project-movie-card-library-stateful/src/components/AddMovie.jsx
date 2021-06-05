// implement AddMovie component here
import React from 'react';
import PropTypes from 'prop-types';

class AddMovie extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.addNewMovie = this.addNewMovie.bind(this);
    this.state = {
      title: '',
      subtitle: '',
      storyline: '',
      rating: 0,
      imagePath: '',
      genre: 'action',
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (name === 'rating') {
      this.setState({ [name]: parseFloat(value) });
    } else {
      this.setState({ [name]: value });
    }
  }

  addNewMovie(event) {
    event.preventDefault();/* Não atualiza o navegador */
    const newMovie = this.state;
    const onClick = this.props.onClick;
    onClick(newMovie);

    this.setState({
      title: '',
      subtitle: '',
      storyline: '',
      rating: 0,
      imagePath: '',
      genre: 'action',
    });
  }

  render() {
    return (
      <div>
        <form className="add-form" data-testid="add-movie-form">
          <div className="add-form-inputs">
            <label htmlFor="input" data-testid="title-input-label">
              Título
              <input
                data-testid="title-input"
                type="text" name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="input" data-testid="subtitle-input-label">
              Subtítulo
              <input
                data-testid="subtitle-input"
                type="text"
                name="subtitle"
                value={this.state.subtitle}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="input" data-testid="image-input-label">
              Imagem
              <input
                data-testid="image-input"
                type="text"
                name="imagePath"
                value={this.state.imagePath}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="input" data-testid="storyline-input-label">
              Sinopse
              <textarea
                data-testid="storyline-input"
                name="storyline"
                value={this.state.storyline}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="input" data-testid="rating-input-label">
              Avaliação
              <input
                data-testid="rating-input"
                type="number"
                name="rating"
                value={this.state.rating}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="select" data-testid="genre-input-label">
              Gênero
              <select
                data-testid="genre-input"
                name="genre"
                value={this.state.genre}
                onChange={this.handleChange}
              >
                <option data-testid="genre-option" value="action">Ação</option>
                <option data-testid="genre-option" value="comedy">Comédia</option>
                <option data-testid="genre-option" value="thriller">Suspense</option>
              </select>
            </label>
          </div>
          <div className="form-button">
            <button data-testid="send-button" onClick={this.addNewMovie}>
              Adicionar filme
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddMovie.propTypes = { onClick: PropTypes.func.isRequired };

export default AddMovie;
