let formElement = document.querySelector('.form-edit-profile');
let nameInput = formElement.querySelector('.form__input_name_name');
let jobInput = formElement.querySelector('.form__input_name_job');
let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.button-edit');
let buttonClose = document.querySelector('.button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

function editProfile() {
  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', editProfile);

buttonClose.addEventListener('click', closePopup);
