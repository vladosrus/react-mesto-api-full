import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Redirect, Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditPropilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import api from "../utils/Api";
import * as Auth from "../utils/Auth";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import successImg from "../images/success.svg";
import unSuccessImg from "../images/unsuccess.svg";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [registrationPopupImg, setRegistrationPopupImg] = useState("");
  const [registrationPopupText, setRegistrationPopupText] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([currentUserInfo, initCards]) => {
          setCurrentUser(currentUserInfo);
          setCards(initCards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    //Проверка, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Отправляем запрос в API, получаем обновлённые данные карточки, находим нужную карточку и обновляем
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedDeleteCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);

    setSelectedCard({});

    setIsRegistrationPopupOpen(false);
    setRegistrationPopupImg("");
    setRegistrationPopupText("");
  }

  function handleUpdateUser(data) {
    api
      .changeProfileInfo(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleUpdateAvatar(data) {
    api
      .changeProfileImg(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlace(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function successRegistration() {
    setRegistrationPopupImg(successImg);
    setRegistrationPopupText("Вы успешно зарегистрировались!");
    setIsRegistrationPopupOpen(true);
    history.push("/sign-in");
  }

  function successLogin() {
    setLoggedIn(true);
    history.push("/");
  }

  function unsuccessAction() {
    setRegistrationPopupImg(unSuccessImg);
    setRegistrationPopupText("Что-то пошло не так! Попробуйте ещё раз.");
    setIsRegistrationPopupOpen(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
  }

  function registration(email, password) {
    Auth.registration(email, password)
      .then((res) => {
        successRegistration();
        console.log(res);
      })
      .catch((err) => {
        unsuccessAction();
        console.log(err);
      });
  }

  function loginCheck(email, password) {
    Auth.authorization(email, password)
      .then((res) => {
        setUserEmail(email);
        localStorage.setItem("token", res.token);
        successLogin();
      })
      .catch((err) => {
        unsuccessAction();
        console.log(err);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.getEmail(token)
        .then((res) => {
          setUserEmail(res.data.email);
          successLogin();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} logout={handleLogout} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onDeleteCardClick={handleDeleteCardClick}
          />

          <Route exact path="/sign-up">
            <Register onRegistration={registration} />
          </Route>

          <Route exact path="/sign-in">
            <Login onLogin={loginCheck} />
          </Route>

          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          card={selectedDeleteCard}
        />
        <ImagePopup
          name="zoom"
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isRegistrationPopupOpen}
          onClose={closeAllPopups}
          popupImg={registrationPopupImg}
          popupText={registrationPopupText}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
