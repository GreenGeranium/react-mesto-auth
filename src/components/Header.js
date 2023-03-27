import logo from "../images/logo.svg";

function Header(props) {
  const pathname = window.location.pathname;

  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта Место Россия" className="logo" />
      {props.loggedIn ? (
        <div className="header__account">
          <p className="header__email">{props.userEmail}</p>
          <a className="header__link">Выйти</a>
        </div>
      ) : pathname === "/sign-in" ? (
        <a className="header__link">Регистрация</a>
      ) : (
        <a className="header__link">Войти</a>
      )}
    </header>
  );
}

export default Header;
