import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [cardImgName, setCardImgName] = useState("");
  const [cardImgLink, setCardImgLink] = useState("");

  function handleChange(evt) {
    if (evt.target.id === "imgname") {
      setCardImgName(evt.target.value);
    } else {
      setCardImgLink(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: cardImgName,
      link: cardImgLink,
    });
  }

  useEffect(() => {
    setCardImgName("");
    setCardImgLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое Место"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form
        className="popup__form"
        name="card"
        id="cardform"
        onSubmit={handleSubmit}
      >
        <div className="popup__input-container">
          <input
            id="imgname"
            className="popup__input popup__input_named_imgname"
            type="text"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            onChange={handleChange}
          />
          <span className="popup__input-error imgname-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            id="cardImgLink"
            className="popup__input popup__input_named_link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            onChange={handleChange}
          />
          <span className="popup__input-error cardImgLink-error"></span>
        </div>
        <button className="popup__submit-button" type="submit">
          Создать
        </button>
      </form>
    </PopupWithForm>
  );
}
