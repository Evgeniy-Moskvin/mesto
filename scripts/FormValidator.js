export class FormValidator {
  constructor({
                formSelector,
                inputSelector,
                submitButtonSelector,
                inactiveButtonClass,
                inputErrorClass,
                errorClass,
              }, form) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    this._form.querySelector(`.${this._errorClass}_field_${inputElement.name}`).textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._form.querySelector(`.${this._errorClass}_field_${inputElement.name}`).textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList) {
    const button = this._form.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', 'disabled');
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  enableValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

    this._toggleButtonState(inputList);

    this._form.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList);
      }, 0);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);

        this._toggleButtonState(inputList);
      });
    });
  }

  resetForm() {
    if (!this._form) {
      return false;
    }

    const inputList = this._form.querySelectorAll(this._inputSelector);
    const errorList = this._form.querySelectorAll(`.${this._errorClass}`);

    inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
    });

    errorList.forEach((errorElement) => {
      errorElement.textContent = '';
    });

    this._form.reset();
  }
}
