import { logPlugin } from '@babel/preset-env/lib/debug';

export default class Card {
  constructor(data, templateSelector, handleCardClick, confirmDelete, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._owner = data.owner._id;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._confirmDelete = confirmDelete;
    this._userId = userId;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.places__item')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement.querySelector('.place-card__delete').addEventListener('click', () => {
      console.log(this);
      this._confirmDelete(this);
    });

    this._cardElement.querySelector('.place-card__like').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });

    this._placeCardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  deleteCard() {
    this._cardElement.remove();
  }

  _toggleLike(evt) {
    if (evt.target.classList.contains('button-like_active')) {
      evt.target.classList.remove('button-like_active');
    } else {
      evt.target.classList.add('button-like_active');
    }
  }



  createCard() {
    this._cardElement = this._getTemplate();
    this._placeCardName = this._cardElement.querySelector('.place-card__name');
    this._placeCardImage = this._cardElement.querySelector('.place-card__image');
    this._placeCardLikes = this._cardElement.querySelector('.place-card__likes-count');
    this._setEventListeners();

    this._placeCardName.textContent = this._name;
    this._placeCardImage.src = this._link;
    this._placeCardImage.alt = this._name;
    this._placeCardLikes.textContent = this._likes;

    if (this._owner !== this._userId) {
      this._cardElement.querySelector('.place-card__delete').remove();
    }

    return this._cardElement;
  }
}
