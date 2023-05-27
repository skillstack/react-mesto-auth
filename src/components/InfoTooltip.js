import React from "react";
import imageDone from "../images/img-done.svg";
import imageFail from "../images/img-fail.svg";

function InfoTooltip({ name, isOpen, onClose, isSuccess }) {

  return (
    <div className={isOpen ? `popup popup_opened popup_type_${name}` : `popup popup_type_${name}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={() => onClose()}
        ></button>
        <img
          className="popup__img-tooltip"
          src={isSuccess ? imageDone : imageFail}
          alt={isSuccess ? "Сделано" : "Ошибка"}
        />
        <h2 className="popup__title-tooltip">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
          }
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;