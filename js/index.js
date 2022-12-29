let formElement = document.querySelector('.form-edit-profile');
let nameInput = formElement.querySelector('.form__input_name_name');
let jobInput = formElement.querySelector('.form__input_name_job');
let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.button-edit');
let buttonClose = document.querySelector('.button-close');

function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  profileName.textContent = name;
  profileJob.textContent = job;

  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

buttonEdit.addEventListener('click', () => {
  popup.classList.add('popup_opened');

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  let name = profileName.textContent;
  let job = profileJob.textContent;

  nameInput.value = name;
  jobInput.value = job;
})

buttonClose.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})
