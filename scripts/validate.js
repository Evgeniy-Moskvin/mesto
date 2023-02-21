const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'button_disabled',
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

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, formElement, submitButtonSelector, inactiveButtonClass) => {
  const button = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  toggleButtonState(inputList, formElement, submitButtonSelector, inactiveButtonClass);

  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, formElement, submitButtonSelector, inactiveButtonClass);
    }, 0);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);

      toggleButtonState(inputList, formElement, submitButtonSelector, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};
