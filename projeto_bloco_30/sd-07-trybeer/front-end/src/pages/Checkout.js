import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Address from '../components/Address';
import Header from '../components/Header';
import { update, finish } from '../actions';
import { saveOrder } from '../services/order';

export default function Checkout() {
  const INITIAL_VALUE = 0;
  const dispatch = useDispatch();

  const cartList = useSelector(({ cart }) => cart.cart);

  const totalValue = cartList
    .map((item) => item.totalPrice)
    .reduce((acc, next) => acc + next, INITIAL_VALUE);

  const [address, setAddress] = useState({
    street: '',
    number: '',
  });

  const [disabled, setDisabled] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState('');

  const removeItem = (item) => {
    const filteredCart = cartList.filter((product) => product.id !== item.id);
    dispatch(update(filteredCart));
  };

  const renderBody = () => cartList.map((item, index) => (
    <div key={ index }>
      <tr>
        <td data-testid={ `${index}-product-qtd-input` }>{ item.quantity }</td>
        <td data-testid={ `${index}-product-name` }>{ item.name }</td>
        <td data-testid={ `${index}-product-unit-price` }>
          { `(${new Intl.NumberFormat('pt-br',
            { style: 'currency', currency: 'BRL' }).format(item.price)} un)` }
        </td>
        <td data-testid={ `${index}-product-total-value` }>
          { `R$ ${new Intl.NumberFormat('pt-br',
            { style: 'currency', currency: 'BRL' }).format(item.totalPrice)}` }
        </td>
      </tr>
      <button
        type="button"
        data-testid={ `${index}-removal-button` }
        onClick={ () => removeItem(item) }
      >
        -
      </button>
    </div>));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress({
      ...address, [name]: value,
    });
  };

  useEffect(() => {
    const MIN_VALUE = 0;
    const { street, number } = address;
    if (street && number && totalValue > MIN_VALUE) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address, totalValue]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) setShouldRedirect('/login');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newList = cartList.map((item) => {
      const { id, quantity } = item;
      return { productId: id, quantity };
    });
    const userOrder = {
      deliveryAddress: address.street,
      deliveryNumber: address.number,
      salesProducts: [...newList],
    };
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await saveOrder(dispatch, finish, userOrder, user.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      <Header title="Finalizar Pedido" />
      <table>
        <thead>
          <tr>
            <th>Quantidade</th>
            <th>Nome</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          { cartList.length !== INITIAL_VALUE ? renderBody()
            : 'Não há produtos no carrinho' }
        </tbody>
      </table>
      <div>
        <span>Valor total do pedido</span>
        <span data-testid="order-total-value">
          { `${new Intl.NumberFormat('pt-br',
            { style: 'currency', currency: 'BRL' }).format(totalValue)}` }
        </span>
      </div>
      <Address
        handleEvent={ (event) => handleChange(event) }
        status={ disabled }
        saveOrder={ (event) => handleSubmit(event) }
      />
    </>
  );
}
