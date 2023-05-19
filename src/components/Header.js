import headerWhiteLogo from '../images/header-logo-white.svg';

function Header() {

  return (
    <header className="header">
      <img className="header__logo" src={headerWhiteLogo} alt="Логотип место Россия" />
    </header>
  );
}

export default Header;