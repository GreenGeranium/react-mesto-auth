function Register() {
  return (
    <main className="content">
      <section className="register">
        <h2 className="register__title">Регистрация</h2>
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
            Зарегистрироваться
          </button>
        </form>
        <p className="register__question">
          Уже зарегистрированы? <a className="register__question">Войти</a>
        </p>
      </section>
    </main>
  );
}

export default Register;
