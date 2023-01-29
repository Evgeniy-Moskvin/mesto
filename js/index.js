let formElement = document.querySelector('.form-edit-profile');
let nameInput = formElement.querySelector('.form__input_name_name');
let jobInput = formElement.querySelector('.form__input_name_job');
let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.button-edit');
let buttonClose = document.querySelector('.button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

const popupFullImage = document.querySelector('.popup_full-image');

const placesCardList = document.querySelector('.places__grid');
const placeCardTemplate = document.querySelector('#place-card-template').content;

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

// CARDS
// =====

function createPlaceCard(item) {
  const card = placeCardTemplate.cloneNode(true);
  card.querySelector('.place-card__name').textContent = item.name;
  card.querySelector('.place-card__image').src = item.link;
  card.querySelector('.place-card__image').alt = item.name;

  card.querySelector('.place-card__like').addEventListener('click', doLike);
  card.querySelector('.place-card__delete').addEventListener('click', deleteCard);
  card.querySelector('.place-card__image').addEventListener('click', showImage);

  return card;
}

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

function doLike(evt) {
  evt.target.classList.toggle('button-like_active');
}

function showImage(evt) {
  popupFullImage.querySelector('.popup__image').src = evt.target.src;
  popupFullImage.querySelector('.popup__image').alt = evt.target.alt;
  popupFullImage.querySelector('.popup__image-name').textContent = evt.target.alt;
  popupFullImage.classList.add('popup_opened');
}

function renderPlaceCard(items) {
  const cards = items.map((item) => {
    return createPlaceCard(item);
  });

  placesCardList.append(...cards);
}

renderPlaceCard(initialCards);
