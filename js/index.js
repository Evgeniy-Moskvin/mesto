let formElement = document.querySelector('.form-edit-profile');
let nameInput = formElement.querySelector('.form__input_name_name');
let jobInput = formElement.querySelector('.form__input_name_job');
let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.button-edit');
let buttonClose = document.querySelector('.button-close');

function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.getAttribute('value');
  let job = jobInput.getAttribute('value');

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  profileName.textContent = name;
  profileJob.textContent = job;
}

formElement.addEventListener('submit', handleFormSubmit);

buttonEdit.addEventListener('click', () => {
  popup.classList.add('popup_opened');

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  let name = profileName.textContent;
  let job = profileJob.textContent;

  nameInput.setAttribute('value', name);
  jobInput.setAttribute('value', job);
})

buttonClose.addEventListener('click', () => {
  nameInput.setAttribute('value', '');
  jobInput.setAttribute('value', '');

  popup.classList.remove('popup_opened');
})
