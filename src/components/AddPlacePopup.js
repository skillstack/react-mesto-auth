import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleAddName(event) {
    setName(event.target.value);
  }

  function handleAddLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_place"
        id="place-input"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleAddName}
        required
      />
      <span className="popup__input-error place-input-error"></span>
      <input
        className="popup__input popup__input_type_link"
        id="link-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={link || ''}
        onChange={handleAddLink}
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup 