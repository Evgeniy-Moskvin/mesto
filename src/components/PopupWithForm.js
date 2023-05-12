import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector('.button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(formValues) {
    this._inputList.forEach((input) => {
      input.value = formValues[input.name];
    });
  }

  sending(done){
    if (done) {
      this._submitButton.textContent = this._submitButtonText;
    } else {
      this._submitButton.textContent = 'Сохранение...'
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
