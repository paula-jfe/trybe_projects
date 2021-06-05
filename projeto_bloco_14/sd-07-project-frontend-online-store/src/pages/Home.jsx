import * as React from 'react';
import * as api from '../services/api';
import { CategoriesList, ProductList, SearchBar } from '../components';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.fetchProductsQuery = this.fetchProductsQuery.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
    this.state = {
      searchText: '',
      productList: [],
      categories: [],
      selectedCategory: [],
      storage: JSON.parse(localStorage.getItem('productsList')),
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  onSearchTextChange(event) {
    const { value } = event.target;
    this.setState({ searchText: value });
  }

  async fetchCategories() {
    const categoriesList = await api.getCategories();
    this.setState({
      categories: categoriesList,
    });
  }

  handleEvent(event) {
    const id = event.target.getAttribute('data-id');
    this.handleCategories(id);
  }

  async fetchProductsQuery(event) {
    event.preventDefault();
    const { searchText } = this.state;
    const productFecth = await api.getProductsFromCategoryAndQuery('', searchText);
    if (!productFecth.results.length) {
      this.setState({
        productList: [],
        message: true,
      });
    } else {
      this.setState({
        productList: productFecth.results,
        message: false,
      });
    }
  }

  handleCategories(id) {
    this.setState({
      selectedCategory: id,
    }, async () => {
      const { searchText, selectedCategory } = this.state;
      const productFecth = await
      api.getProductsFromCategoryAndQuery(selectedCategory, searchText);
      this.setState({
        productList: productFecth.results,
        message: false,
      });
    });
  }

  saveStorage({ target }) {
    const oneNegative = -1;
    const twoPositive = 2;
    let price = (parseFloat(target.getAttribute('data-price'))).toFixed(twoPositive);
    const id = target.getAttribute('data-id');
    const title = target.getAttribute('data-title');
    const thumbnail = target.getAttribute('data-thumbnail');
    const availableQuantity = (
      parseInt(target.getAttribute('data-available-quantity'), 10)
    );
    const products = JSON.parse(localStorage.getItem('productsList'));
    const findIndexInArray = products.findIndex((item) => item.id === id);

    if (findIndexInArray !== oneNegative) {
      products[findIndexInArray].quantity += 1;
      price *= products[findIndexInArray].quantity;
      products[findIndexInArray].price = price;
      localStorage.setItem('productsList', JSON.stringify([...products]));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    } else {
      const quantity = 1;
      localStorage.setItem('productsList', JSON.stringify(
        [...products, { id, title, thumbnail, price, quantity, availableQuantity }],
      ));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    }
  }

  render() {
    const { message, productList, categories } = this.state;
    const noProduct = <p>Nenhum produto foi encontrado</p>;
    const magicNumber = 0;
    const { storage } = this.state;
    const itemQuantity = storage.map((item) => item.quantity)
      .reduce((acc, nextValue) => acc + nextValue, magicNumber);
    const cartQuantity = (storage) ? itemQuantity : magicNumber;

    return (
      <div className="container">
        <h1>Mercadin Online</h1>
        <SearchBar
          onSearchTextChange={ this.onSearchTextChange }
          onClickAPI={ this.fetchProductsQuery }
          cartQuantity={ cartQuantity }
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CategoriesList
          handleCategories={ this.handleEvent }
          categories={ categories }
        />
        { message ? noProduct : <ProductList
          newStorageState1={ this.saveStorage }
          products={ productList }
        /> }
      </div>
    );
  }
}

export default Home;
