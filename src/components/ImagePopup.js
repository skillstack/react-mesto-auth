function ImagePopup({ card, onClose }) {

  return (
    <div className={card ? `popup popup_opened popup_type_img` : `popup popup_type_img`}>
      <div className="popup__img-container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму добавления места"
          onClick={() => onClose()}
        ></button>
        <figure className="popup__figure">
          <img className="popup__img" src={card ? card.link : ''} alt={card ? card.name : ''} />
          <figcaption className="popup__caption">{card ? card.name : ''}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;