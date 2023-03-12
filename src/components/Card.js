import { showImage } from "../pages";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.places__item')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement.querySelector('.place-card__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardElement.querySelector('.place-card__like').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });

    this._placeCardImage.addEventListener('click', () => {
      this._showImage(this._link, this._name);
    });
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('button-like_active');
  }

  _showImage(src, name) {
    showImage(src, name);
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._placeCardName = this._cardElement.querySelector('.place-card__name');
    this._placeCardImage = this._cardElement.querySelector('.place-card__image');
    this._setEventListeners();

    this._placeCardName.textContent = this._name;
    this._placeCardImage.src = this._link;
    this._placeCardImage.alt = this._name;

    return this._cardElement;
  }
}
