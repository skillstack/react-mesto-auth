import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCard()])
      .then(([userData, listOfCards]) => {
        setCurrentUser(userData);
        setCards(listOfCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, [])

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((stateCard) => stateCard._id !== card._id))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar(avatarData) {
    api.updateAvatar(avatarData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.postNewCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main
          onEditAvatar={setIsEditAvatarPopupOpen}
          onEditProfile={setIsEditProfilePopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        {/* Редактирование фото профиля */}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Редактирование профиля */}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Создание карточки места */}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* Подтверждение удаления карточки места  */}

        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          buttonText='Да'
          onClose={closeAllPopups}
        />

        {/* Просмотр фото места на весь экран */}

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
