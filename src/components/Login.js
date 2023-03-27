function Login() {
  return (
    <main className="content">
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="form">
          <label className="form__field">
            <input
              className="form__input form__input_theme_black"
              name="profile-email"
              type="email"
              placeholder="Email"
              required
              id="email-input"
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
