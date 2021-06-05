import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();
    this.updateMovieList = this.updateMovieList.bind(this);
    this.state = {
      movies: [],
      loadingList: false,
    };
  }

  componentDidMount() {
    this.updateMovieList();
  }

  async updateMovieList() {
    this.setState(
      { loadingList: true },
      async () => {
        const moviesFound = await movieAPI.getMovies();
        this.setState({
          movies: moviesFound,
          loadingList: false,
        });
      },
    );
  }

  render() {
    const { movies, loadingList } = this.state;
    const loadingElement = <Loading />;
    const movieCards = movies.map((movie) => <MovieCard key={movie.title} movie={movie} />);

    return (
      <div data-testid="movie-list">
        {loadingList ? loadingElement : movieCards}
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;
