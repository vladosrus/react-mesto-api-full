import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleChange(evt) {
    if (evt.target.id === "name") {
      setName(evt.target.value);
    } else {
      setDescription(evt.target.value);
    }
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form
        className="popup__form"
        name="profile"
        id="profileform"
        onSubmit={handleSubmit}
      >
        <div className="popup__input-container">
          <input
            id="name"
            className="popup__input popup__input_named_name"
            type="text"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="40"
            value={name || ""}
            onChange={handleChange}
          />
          <span className="popup__input-error name-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            id="job"
            className="popup__input popup__input_named_job"
            type="text"
            placeholder="Расскажите о себе"
            required
            minLength="2"
            maxLength="200"
            value={description || ""}
            onChange={handleChange}
          />
          <span className="popup__input-error job-error"></span>
        </div>
        <button className="popup__submit-button" type="submit">
          Сохранить
        </button>
      </form>
    </PopupWithForm>
  );
}
