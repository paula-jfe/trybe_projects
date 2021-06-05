import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  }

  handleClick() {
    const { email } = this.state;
    const userEmail = { email };
    const { history } = this.props;
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('./comidas');
  }

  enableButton() {
    const { email, password } = this.state;
    const regexForEmail = /\S+@\S+\.\S+/;
    const length = 6;
    const passwordIsValid = password.length > length;
    const emailIsValid = regexForEmail.test(email);
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

  render() {
    const { disabled } = this.state;

    return (
      <div>
        <form>
          <input
            name="email"
            data-testid="email-input"
            type="email"
            onChange={ this.handleChange }
          />
          <input
            name="password"
            data-testid="password-input"
            type="password"
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
