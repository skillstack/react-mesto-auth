import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="name-input"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        className="popup__input popup__input_type_about"
        id="about-input"
        type="text"
        name="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;