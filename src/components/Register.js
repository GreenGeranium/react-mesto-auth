import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //регистрация
  function onSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <main className="content">
      <section className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form
          className="form"
          method="get"
          name="registration"
          id="registration"
          onSubmit={onSubmit}
        >
          <label className="form__field">
            <input
              className="form__input form__input_theme_black"
              name="profile-email"
              type="email"
              placeholder="Email"
              required
              id="email-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className="form__field">
            <input
              className="form__input form__input_theme_black"
              type="password"
              name="profile-password"
              placeholder="Пароль"
              required
              id="password-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button className="form__save-button form__save-buttton_theme_black">
            Зарегистрироваться
          </button>
        </form>
        <p className="auth__question">
          Уже зарегистрированы?{" "}
          <Link className="auth__question" to="/sign-in">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
