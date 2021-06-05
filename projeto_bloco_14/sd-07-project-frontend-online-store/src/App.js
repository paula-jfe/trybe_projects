import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

function App() {
  const localStorageObjetcs = JSON.parse(localStorage.getItem('productsList'));
  if (!localStorageObjetcs) {
    localStorage.setItem('productsList', JSON.stringify([]));
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/product/:category_id/:id" component={ ProductDetails } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
