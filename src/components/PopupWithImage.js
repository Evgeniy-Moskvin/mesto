import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector('.popup__image');
    this._imageName = this._popup.querySelector('.popup__image-name');
  }

  open(src, name) {
    this._image.src = src;
    this._imageName.alt = name;
    this._imageName.textContent = name;
    super.open();
  }
}
