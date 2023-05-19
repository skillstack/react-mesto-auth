import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const galleryLikeButtonClassName = (`gallery__like ${isLiked && 'gallery__like_active'}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="gallery__item">
      {isOwn && <button className="gallery__del" type="button" aria-label="Удалить место" onClick={handleDeleteClick} />}
      <img
        className="gallery__photo"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="gallery__caption">
        <h2 className="gallery__title">{props.card.name}</h2>
        <div className="gallery__like-container">
          <button 
            className={galleryLikeButtonClassName}
            type="button"
            aria-label="Поставить сердечко"
            onClick={handleLikeClick}
          />
          <div className="gallery__like-counter">{props.card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;