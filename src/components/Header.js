import logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header(props) {
  const pathname = window.location.pathname;

  //выход из аккаунта

  const navigate = useNavigate();
  function onSignOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта Место Россия" className="logo" />
      {props.loggedIn ? (
        <div className="header__account">
          <p className="header__email">{props.userEmail}</p>
          <a className="header__link" onClick={onSignOut}>
            Выйти
          </a>
        </div>
      ) : pathname === "/sign-in" ? (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      ) : (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}
    </header>
  );
  //TODO: исправить в шапке название ссылки
}

export default Header;
