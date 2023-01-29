const formEditProfile = document.querySelector('.form-edit-profile');
const profileNameInput = formEditProfile.querySelector('.form__input_name_name');
const profileJobInput = formEditProfile.querySelector('.form__input_name_job');
const buttonEditProfile = document.querySelector('.button-edit');
const buttonAddPlaceCard = document.querySelector('.button-add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlaceCard = document.querySelector('.popup_add-place-card');
const popupFullImage = document.querySelector('.popup_full-image');
const buttonClose = document.querySelectorAll('.button-close')

const placesCardList = document.querySelector('.places__grid');
const placeCardTemplate = document.querySelector('#place-card-template').content;
const formAddPlaceCard = document.querySelector('.form-add-place-card');
const placeNameInput = formAddPlaceCard.querySelector('.form__input_name_name');
const placeImageInput = formAddPlaceCard.querySelector('.form__input_name_image');


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

initProfileEditor();



// POPUPS
// ======

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonClose.forEach((item) => {
  item.addEventListener('click', () => {
    closePopup(item.closest('.popup'));
  })
});

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile)
});

buttonAddPlaceCard.addEventListener('click', () => {
  openPopup(popupAddPlaceCard);
});



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
