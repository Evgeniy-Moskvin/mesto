const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error-message',
}

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  formElement.querySelector(`.${errorClass}_field_${inputElement.name}`).textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  formElement.querySelector(`.${errorClass}_field_${inputElement.name}`).textContent = '';
}

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass)
    });
  });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, inputErrorClass, errorClass);
  })
};

enableValidation(config);
