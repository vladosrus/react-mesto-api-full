import React from "react";

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_named_zoom ${props.isOpen && "popup_opened"}`}>
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <button
          className="popup__close-icon"
          type="button"
          onClick={props.onClose}
        />
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  );
}
