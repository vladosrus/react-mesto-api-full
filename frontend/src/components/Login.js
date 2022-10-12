import { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    if (evt.target.id === "login-email") {
      setEmail(evt.target.value);
    } else {
      setPassword(evt.target.value);
    }
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
    setEmail("");
    setPassword("");
  }
  return (
    <section className="entrance-pages">
      <h2 className="entrance-pages__title">Вход</h2>
      <form
        className="entrance-pages__form"
        name="login"
        id="loginform"
        onSubmit={handleSubmit}
      >
        <input
          id="login-email"
          className="entrance-pages__input login__input_named_email"
          type="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={email || ""}
          onChange={handleChange}
        />
        <input
          id="login-password"
          className="entrance-pages__input login__input_named_password"
          type="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="200"
          value={password || ""}
          onChange={handleChange}
        />
        <button className="entrance-pages__submit-button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
