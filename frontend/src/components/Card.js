import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  //Определяем, являюсь ли я владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  //Переменную, задающая className для кнопки удалении
  const cardDeleteButtonClassName = `element__basket-button ${
    !isOwn && "element__basket-button_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteCardClick() {
    props.onDeleteCardClick(props.card);
  }

  return (
    <article className="element card">
      <img
        className="element__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteCardClick}
      />
      <div className="element__caption">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            id="like"
            onClick={handleLikeClick}
          />
          <p className="element__like-count">{props.likes}</p>
        </div>
      </div>
    </article>
  );
}
