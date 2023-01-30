const popupEditProfile = document.querySelector('.popup_name_edit-profile');
const popupAddPlaceCard = document.querySelector('.popup_name_add-place-card');
const popupFullImage = document.querySelector('.popup_name_full-image');
const buttonsClose = document.querySelectorAll('.button-close');

const formEditProfile = popupEditProfile.querySelector('.form');
const profileNameInput = formEditProfile.querySelector('.form__input_name_name');
const profileJobInput = formEditProfile.querySelector('.form__input_name_job');
const buttonEditProfile = document.querySelector('.button-edit');
const buttonAddPlaceCard = document.querySelector('.button-add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placesCardList = document.querySelector('.places__grid');
const placeCardTemplate = document.querySelector('#place-card-template').content;
const formAddPlaceCard = popupAddPlaceCard.querySelector('.form');
const placeNameInput = formAddPlaceCard.querySelector('.form__input_name_name');
const placeImageInput = formAddPlaceCard.querySelector('.form__input_name_image');
const placeFullImage = popupFullImage.querySelector('.popup__image');


// POPUPS
// ======

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonsClose.forEach((item) => {
  item.addEventListener('click', () => {
    closePopup(item.closest('.popup'));
  })
});



// PROFILE
// =======

function initProfileEditor() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

function editProfile(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', editProfile);

buttonEditProfile.addEventListener('click', () => {
  initProfileEditor();
  openPopup(popupEditProfile);
});



// CARDS
// =====

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

function doLike(evt) {
  evt.target.classList.toggle('button-like_active');
}

function showImage(evt) {
  placeFullImage.src = evt.target.src;
  placeFullImage.alt = evt.target.alt;
  popupFullImage.querySelector('.popup__image-name').textContent = evt.target.alt;
  openPopup(popupFullImage);
}

function createPlaceCard(item) {
  const card = placeCardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.place-card__image');
  card.querySelector('.place-card__name').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  card.querySelector('.place-card__like').addEventListener('click', doLike);
  card.querySelector('.place-card__delete').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', showImage);

  return card;
}

function renderPlaceCard(items) {
  const cards = items.map((item) => {
    return createPlaceCard(item);
  });

  placesCardList.append(...cards);
}

renderPlaceCard(initialCards);

function addPlaceCard(evt) {
  evt.preventDefault();

  const placeCard = {
    name: placeNameInput.value,
    link: placeImageInput.value,
  }

  placesCardList.prepend(createPlaceCard(placeCard));

  closePopup(popupAddPlaceCard);
  formAddPlaceCard.reset();
}

formAddPlaceCard.addEventListener('submit', addPlaceCard);

buttonAddPlaceCard.addEventListener('click', () => {
  openPopup(popupAddPlaceCard);
});