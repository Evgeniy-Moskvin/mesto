import { logPlugin } from '@babel/preset-env/lib/debug';

export default class Card {
  constructor(data, templateSelector, handleCardClick, confirmDelete, userId, setLike, deleteLike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._confirmDelete = confirmDelete;
    this._userId = userId;
    this._setLike = setLike;
    this._deleteLike = deleteLike;

    this.toggleLike = this.toggleLike.bind(this);
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.places__item')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement.querySelector('.place-card__delete').addEventListener('click', () => {
      this._confirmDelete(this);
    });

    this._cardElement.querySelector('.place-card__like').addEventListener('click', (evt) => {
      this.toggleLike(evt);
    });

    this._placeCardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  deleteCard() {
    this._cardElement.remove();
  }

  toggleLike(evt) {
    if (evt.target.classList.contains('button-like_active')) {
      evt.target.classList.remove('button-like_active');
      this._deleteLike(this);
    } else {
      evt.target.classList.add('button-like_active');
      this._setLike(this);
    }
  }

  updateLikeCount(likes) {
    this._placeCardLikes.textContent = likes;
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
    this._placeCardLikes.textContent = this._likes.length;

    if (this._owner !== this._userId) {
      this._cardElement.querySelector('.place-card__delete').remove();
    }

    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._cardElement.querySelector('.place-card__like').classList.add('button-like_active');
      }
    })

    return this._cardElement;
  }
}
