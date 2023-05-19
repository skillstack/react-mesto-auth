import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_link"
        id="link-input-avatar"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error link-input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;