import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__edit-img-button"
          type="button"
          aria-label="Отредактировать аватар профиля"
          onClick={() => props.onEditAvatar(true)}>
          <img className="profile__photo" src={currentUser.avatar} alt="Аватар профиля" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Отредактировать профиль"
            onClick={() => props.onEditProfile(true)}>
          </button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить новое место"
          onClick={() => props.onAddPlace(true)}>
        </button>
      </section>
      <section className="gallery">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;