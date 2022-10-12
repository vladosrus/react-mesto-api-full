export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_named_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button
          className="popup__close-icon"
          type="button"
          onClick={props.onClose}
        />
        {props.children}
      </div>
    </div>
  );
}
