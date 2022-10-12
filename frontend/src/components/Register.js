import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    if (evt.target.id === "sign-up-email") {
      setEmail(evt.target.value);
    } else {
      setPassword(evt.target.value);
    }
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegistration(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <section className="entrance-pages">
      <h2 className="entrance-pages__title">Регистрация</h2>
      <form
        className="entrance-pages__form"
        name="sign-up"
        id="sign-upform"
        onSubmit={handleSubmit}
      >
        <input
          id="sign-up-email"
          className="entrance-pages__input sign-up__input_named_email"
          type="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={email || ""}
          onChange={handleChange}
        />
        <input
          id="sign-up-password"
          className="entrance-pages__input sign-up__input_named_password"
          type="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="200"
          value={password || ""}
          onChange={handleChange}
        />
        <button
          className="entrance-pages__submit-button sign-up__submit-button"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="entrance-pages__caption">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="entrance-pages__link">
          Войти
        </Link>
      </p>
    </section>
  );
}
