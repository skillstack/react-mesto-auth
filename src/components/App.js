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
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import apiAuth from '../utils/apiAuth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCard()])
        .then(([userData, listOfCards]) => {
          setCurrentUser(userData);
          setCards(listOfCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }, [isLoggedIn])

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth.checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setEmail(data.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }, [navigate]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
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

  function handleRegisterUser(email, password) {
    apiAuth.registerUser(email, password)
      .then((data) => {
        if (data) {
          setIsSuccess(true);
          navigate("/signin");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLoginUser(email, password) {
    apiAuth.loginUser(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          setEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header
          onSignOut={handleSignOut}
          email={email}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                buttonText="Войти"
                title="Вход"
                onLogin={handleLoginUser}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                buttonText="Зарегистрироваться"
                title="Регистрация"
                message="Уже зарегистрированы? Войти"
                onRegister={handleRegisterUser}
              />
            }
          />
          <Route
            path='*'
            element={isLoggedIn
              ?
              <Navigate to="/" replace />
              :
              <Navigate to="/signin" replace />
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}

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

        {/* Подтверждение успешности входа */}

        <InfoTooltip
          name='tooltip'
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
