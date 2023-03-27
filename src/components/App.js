import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  //установление изначально закрытых папапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);

  //выбранная карточка
  const [selectedCard, setSelectedCard] = useState({});

  //массив карточек с сервера
  const [cards, setCards] = useState([]);

  //действующий пользователь
  const [currentUser, setCurrentUser] = useState({});

  //данные карточки, которую нужно удалить
  const [deletingCard, setDeletingCard] = useState({});

  //получение действующего профиля
  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //открытие попапа подтверждения удаления и передача данных карточки для удаления
  function handleConfirmation(card) {
    setIsConfirmationPopupOpen(true);
    setDeletingCard(card);
  }

  //обработчик удаления карточки
  function handleDeleteCard() {
    api
      .handleDeleteCard(deletingCard._id)
      .then((data) => {
        renderCardsAfterDeleting();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //рендер карточек после подтверждения удаления
  function renderCardsAfterDeleting() {
    setCards((cards) =>
      cards.filter((c) => {
        return c._id !== deletingCard._id;
      })
    );
  }

  //обработчик лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (cardLiker) => cardLiker._id === currentUser._id
    );

    api
      .handleCardLike(card._id, isLiked)
      .then((data) => {
        setCards((cards) =>
          cards.map((c) => {
            return c._id === card._id ? data : c;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //рендер всех карточек
  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //отправка на сервер новых данных пользователя из формы
  function handleUpdateUser(data) {
    api
      .changeUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //отправка на сервер новой аватарки из формы
  function handleUpdateAvatar(link) {
    api
      .changeProfileAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //отправка на сервер новой карточки из формы
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.place, data.link)
      .then((newData) => {
        setCards([newData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработчик клика по карточке
  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }

  //открытие попапа с изменением аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //открытие попапа с изменением профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //открытие попапа с добавлением места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //закрытие всех попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);

    //сброс выбранной карточки
    setSelectedCard({});
  }

  //авторизован ли пользователь
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn}></Header>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onTrashClick={handleConfirmation}
                element={Main}
              ></ProtectedRoute>
            }
          ></Route>
          <Route path="/sign-in" element={<Login></Login>}></Route>
          <Route path="/sign-up" element={<Register></Register>}></Route>
        </Routes>
        <Footer></Footer>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        ></ImagePopup>
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
        ></ConfirmationPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
