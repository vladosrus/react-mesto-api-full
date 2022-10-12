import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form
        className="popup__form"
        name="deletecard"
        id="deletecardform"
        onSubmit={handleSubmit}
      >
        <button className="popup__submit-button" type="submit">
          Да
        </button>
      </form>
    </PopupWithForm>
  );
}
