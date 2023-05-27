import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import headerWhiteLogo from '../images/header-logo-white.svg';

function Header({ onSignOut, email }) {

  return (
    <header className="header">
      <img className="header__logo" src={headerWhiteLogo} alt="Логотип место Россия" />
      <Routes>
        <Route
          path="/signin"
          element={
            <Link
              className="header__link"
              to="/signup"
            >
              Регистрация
            </Link>
          }
        />

        <Route
          path="/signup"
          element={
            <Link
              className="header__link"
              to="/signin"
            >
              Войти
            </Link>
          }
        />

        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">
                {email}
              </p>
              <Link
                className="header__exit"
                onClick={onSignOut}
                to="/signin"
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;