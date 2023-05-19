function PopupWithForm(props) {

  return (
    <div className={props.isOpen ? `popup popup_opened popup_type_${props.name}` : `popup popup_type_${props.name}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={() => props.onClose()}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
          {/* Место вставки полей формы */}
          {props.children}
          <button className="popup__save-button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;