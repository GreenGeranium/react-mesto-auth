import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта Место Россия" className="logo" />
      {props.loggedIn ? "" : <a className="header__login">Регистрация</a>}
    </header>
  );
}

export default Header;
