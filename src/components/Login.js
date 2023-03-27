import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //вход в профиль
  function onSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <main className="content">
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form
          className="form"
          method="get"
          name="authentication"
          id="authentication"
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
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
