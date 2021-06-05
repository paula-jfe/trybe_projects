// implement MovieLibrary component here
import React from 'react';
import PropTypes from 'prop-types';
import './components.css';
import AddMovie from './AddMovie';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props); /* Chama o construtor do React.Component */
    this.handleChange = this.handleChange.bind(this);
    this.addNewMovie = this.addNewMovie.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
    this.filteredGenreFuncion = this.filteredGenreFuncion.bind(this);
    this.filteredBookMarkedFunction = this.filteredBookMarkedFunction.bind(this);
    this.filteredTextFunction = this.filteredTextFunction.bind(this);
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
  }

  filteredGenreFuncion(chosenGenre, moviesArray) {
    if (chosenGenre !== '') {
      return moviesArray.filter((movie) => movie.genre === chosenGenre);
    }
    return moviesArray;
  }

  filteredBookMarkedFunction(filteredGenre, isBookMarked) {
    if (isBookMarked !== false) {
      return filteredGenre.filter((movie) => movie.bookmarked === true);
    }
    return filteredGenre;
  }

  filteredTextFunction(filteredBookMarked, chosenText) {
    if (chosenText !== '') {
      return filteredBookMarked.filter((movie) =>
      movie.title.toLowerCase().includes(chosenText.toLowerCase()) === true ||
      movie.subtitle.toLowerCase().includes(chosenText.toLowerCase()) === true ||
      movie.storyline.toLowerCase().includes(chosenText.toLowerCase()) === true);
    }
    return filteredBookMarked;
  }

  handleChange({ target }) {
    const { name, type, checked, value } = target;
    const valueType = type === 'checkbox' ? checked : value;
    this.setState({ [name]: valueType }, () => this.filterMovies());
  }

  filterMovies() {
    const moviesArray = this.state.movies;
    const chosenGenre = this.state.selectedGenre;
    const isBookMarked = this.state.bookmarkedOnly;
    const chosenText = this.state.searchText;
    const filteredGenre = this.filteredGenreFuncion(chosenGenre, moviesArray);
    const filteredBookMarked = this.filteredBookMarkedFunction(filteredGenre, isBookMarked);
    const filteredText = this.filteredTextFunction(filteredBookMarked, chosenText);

    return filteredText;
  }

  addNewMovie(newMovie) {
    const movies = this.state.movies;
    this.setState({ movies: [...movies, newMovie] });
  }

  render() {
    return (
      <div>
        <div className="form-section">
          <SearchBar
            searchText={this.state.searchText}
            onSearchTextChange={this.handleChange}
            bookmarkedOnly={this.state.bookmarkedOnly}
            onBookmarkedChange={this.handleChange}
            selectedGenre={this.state.selectedGenre}
            onSelectedGenreChange={this.handleChange}
          />
          <AddMovie onClick={this.addNewMovie} />
        </div>
        <MovieList movies={this.filterMovies()} />
      </div>
    );
  }
}

MovieLibrary.propTypes = { movies: PropTypes.arrayOf(PropTypes.object).isRequired };

export default MovieLibrary;
