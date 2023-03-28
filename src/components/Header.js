import logo from "../images/logo.svg";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function Header(props) {
  //обработчик клика по Выйти
  function onClick() {
    props.onSignout();
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта Место Россия" className="logo" />

      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        ></Route>
        <Route
          path="/"
          element={
            props.loggedIn && (
              <div className="header__account">
                <p className="header__email">{props.userEmail}</p>
                <a className="header__link" onClick={onClick}>
                  Выйти
                </a>
              </div>
            )
          }
        ></Route>
      </Routes>
    </header>
  );
  //TODO: исправить в шапке название ссылки
}

export default Header;
