import PopupWithForm from "./PopupWithForm";

export default function InfoTooltip(props) {
  
  return (
    <PopupWithForm
      name="infotooltip"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <img src={props.popupImg} className="popup__success-image" />
      <h2 className="popup__title popup__title_place_success-popup">{props.popupText}</h2>
    </PopupWithForm>
  );
}
