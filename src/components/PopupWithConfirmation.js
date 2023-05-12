import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._delete = this._delete.bind(this);
  }

  setEventListeners() {
    this._popup.querySelector('.button').addEventListener('click', this._delete);
    super.setEventListeners();
  }

  _delete() {
    this._handleDelete(this._card);
  }

  open(card) {
    this._card = card;
    super.open();
  }
}
