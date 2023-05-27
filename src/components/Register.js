import React from 'react';
import { Link } from 'react-router-dom';

function Register({ buttonText, title, message, onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleInputPassword(event) {
    setPassword(event.target.value);
  }

  function handleInputEmail(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="content">
      <form
        className="auth-form"
        name="register"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="auth-form__title">
          {title}
        </h2>

        <input
          className="auth-form__input"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputEmail}
        />

        <input
          className="auth-form__input"
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handleInputPassword}
        />

        <button
          className="auth-form__button"
          type="submit"
        >
          {buttonText}
        </button>

        <Link
          className="auth-form__login-link"
          to="/signin"
        >
          {message}
        </Link>

      </form>
    </div>
  );
}

export default Register;