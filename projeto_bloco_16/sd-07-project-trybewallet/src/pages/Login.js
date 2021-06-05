import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      emailInput: '',
      passwordInput: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  }

  enableButton() {
    const { emailInput, passwordInput } = this.state;
    const regexForEmail = /\S+@\S+\.\S+/;
    const minlength = 6;
    const passwordIsValid = passwordInput.length >= minlength;
    const emailIsValid = regexForEmail.test(emailInput);
    if (passwordIsValid && emailIsValid === true) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleClick() {
    const { emailInput } = this.state;
    const { email, history } = this.props;
    email(emailInput);
    history.push('./carteira');
  }

  render() {
    const { emailInput, passwordInput, disabled } = this.state;

    return (
      <div>
        <input
          id="emailInput"
          name="emailInput"
          type="email"
          value={ emailInput }
          data-testid="email-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          id="passwordInput"
          name="passwordInput"
          type="password"
          value={ passwordInput }
          data-testid="password-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ (event) => this.handleClick(event) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  email: (value) => dispatch(login(value)),
});

Login.propTypes = {
  email: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
