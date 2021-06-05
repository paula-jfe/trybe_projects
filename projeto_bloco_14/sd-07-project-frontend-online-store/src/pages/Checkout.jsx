import React from 'react';
import { Redirect } from 'react-router-dom';
import boleto from '../img/boleto.png';
import visa from '../img/visa.png';
import mastercard from '../img/mastercard.png';
import elo from '../img/elo.png';

class Checkout extends React.Component {
  constructor() {
    super();
    this.validateForm = this.validateForm.bind(this);
    this.dataForm = this.dataForm.bind(this);
    this.state = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      redirect: false,
      filled: true,
    };
  }

  validateForm() {
    const magicNumber = 0;
    const { name, email, cpf, phone, cep, address } = this.state;
    const isNameOk = name.length > magicNumber ? name : 'empty';
    const isEmailOk = email.length > magicNumber ? email : 'empty';
    const isCpfOk = cpf.length > magicNumber ? cpf : 'empty';
    const isPhoneOk = phone.length > magicNumber ? phone : 'empty';
    const isCepOk = cep.length > magicNumber ? cep : 'empty';
    const isAddressOk = address.length > magicNumber ? address : 'empty';
    const arrayOfStates = [isNameOk, isEmailOk, isCpfOk, isPhoneOk, isCepOk, isAddressOk];
    const validateOK = arrayOfStates.some((item) => item === 'empty');

    if (!validateOK) {
      this.setState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        cep: '',
        address: '',
        redirect: true,
      });
    } else {
      this.setState({
        filled: false,
      });
    }
  }

  formStates(field, newValue) {
    this.setState({ [field]: newValue });
  }

  dataForm() {
    const { filled } = this.state;

    return (
      <div>
        <div>
          <p>Informações do comprador</p>
          <label htmlFor="name">
            Nome completo
            <input
              id="name"
              className={ filled === true ? 'formFilled' : 'formNotFilled' }
              type="text"
              placeholder="Digite seu nome completo"
              data-testid="checkout-fullname"
              onChange={ (event) => this.formStates('name', event.target.value) }
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              className={ filled === true ? 'formFilled' : 'formNotFilled' }
              type="text"
              placeholder="Digite seu e-mail"
              data-testid="checkout-email"
              onChange={ (event) => this.formStates('email', event.target.value) }
            />
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              id="cpf"
              className={ filled === true ? 'formFilled' : 'formNotFilled' }
              type="text"
              placeholder="Digite seu CPF"
              data-testid="checkout-cpf"
              onChange={ (event) => this.formStates('cpf', event.target.value) }
            />
          </label>
          <label htmlFor="phone">
            Telefone
            <input
              id="phone"
              className={ filled === true ? 'formFilled' : 'formNotFilled' }
              type="text"
              placeholder="Digite seu telefone"
              data-testid="checkout-phone"
              onChange={ (event) => this.formStates('phone', event.target.value) }
            />
          </label>
          <label htmlFor="cep">
            CEP
            <input
              id="cep"
              className={ filled === true ? 'formFilled' : 'formNotFilled' }
              type="text"
              placeholder="Digite seu CEP"
              data-testid="checkout-cep"
              onChange={ (event) => this.formStates('cep', event.target.value) }
            />
          </label>
          <label htmlFor="address">
            Endereço
            <input
              id="address"
              className={ filled === true ? 'formFilled' : 'formNotFilled' }
              type="text"
              placeholder="Digite seu endereço"
              data-testid="checkout-address"
              onChange={ (event) => this.formStates('address', event.target.value) }
            />
          </label>
        </div>
        <div className={ filled === true ? 'formRadioFilled' : 'formNotFilled' }>
          <p>Método de pagamento</p>
          <label htmlFor="payment">
            <p>Boleto</p>
            <input
              name="payment"
              id="boleto"
              value="boleto"
              type="radio"
              onChange={ (event) => this.formStates('payment', event.target.value) }
            />
            <img src={ boleto } alt="boleto" width="33px" />
            <p>Cartão de crédito</p>
            <input
              name="payment"
              value="visa"
              type="radio"
              onChange={ (event) => this.formStates('payment', event.target.value) }
            />
            <img src={ visa } alt="visa" width="40px" />
            <input
              name="payment"
              value="mastercard"
              type="radio"
              onChange={ (event) => this.formStates('payment', event.target.value) }
            />
            <img src={ mastercard } alt="mastercard " width="40px" />
            <input
              name="payment"
              value="elo"
              type="radio"
              onChange={ (event) => this.formStates('payment', event.target.value) }
            />
            <img src={ elo } alt="elo" width="40px" />
          </label>
        </div>
      </div>
    );
  }

  render() {
    const magicNumber = 0;
    const storedProducts = JSON.parse(localStorage.getItem('productsList'));
    const { redirect } = this.state;
    const totalPrice = storedProducts
      .map((product) => product.price)
      .reduce((acc, nextValue) => acc + nextValue, magicNumber);

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div>
          <form>
            { this.dataForm() }
          </form>
        </div>
        <div>
          <p>Revise seus produtos</p>
          { storedProducts.map(((product) => (
            <div key={ `${product.id}` }>
              <img alt="Product" src={ product.thumbnail } />
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
              <p>{ product.price }</p>
            </div>
          ))) }
        </div>

        <div>{ totalPrice }</div>
        <button type="submit" onClick={ this.validateForm }>Comprar</button>
      </div>
    );
  }
}

export default Checkout;
