const popupEditProfile = document.querySelector('.popup_name_edit-profile');
const popupAddPlaceCard = document.querySelector('.popup_name_add-place-card');
const popupFullImage = document.querySelector('.popup_name_full-image');
const popupImageName = popupFullImage.querySelector('.popup__image-name');
const closeButtons = document.querySelectorAll('.button-close');
const popups = document.querySelectorAll('.popup');

const formEditProfile = document.forms['form-edit-profile'];
const profileNameInput = formEditProfile.querySelector('.form__input_name_name');
const profileJobInput = formEditProfile.querySelector('.form__input_name_job');
const buttonEditProfile = document.querySelector('.button-edit');
const buttonAddPlaceCard = document.querySelector('.button-add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placesCardList = document.querySelector('.places__grid');
const placeCardTemplate = document.querySelector('#place-card-template').content;
const formAddPlaceCard = document.forms['form-add-place-card'];
const placeNameInput = formAddPlaceCard.querySelector('.form__input_name_name');
const placeImageInput = formAddPlaceCard.querySelector('.form__input_name_image');
const placeFullImage = popupFullImage.querySelector('.popup__image');


const resetForm = ({inputSelector, inputErrorClass, errorClass}, form) => {
  if (!form) {
    return false;
  }

  const inputList = form.querySelectorAll(inputSelector);
  const errorList = form.querySelectorAll(`.${errorClass}`);

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(inputErrorClass);
  });

  errorList.forEach((errorElement) => {
    errorElement.textContent = '';
  });

  form.reset();
};



// POPUPS
// ======

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

popups.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popupElement)
    }
  });
});



// PROFILE
// =======

const initProfileEditor = () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

const editProfile = (evt) =>  {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', editProfile);

buttonEditProfile.addEventListener('click', () => {
  resetForm(config, formEditProfile);
  initProfileEditor();
  openPopup(popupEditProfile);
});



// CARDS
// =====

const deleteCard = (evt) =>  {
  evt.target.closest('.places__item').remove();
}

const toggleLike = (evt) => {
  evt.target.classList.toggle('button-like_active');
}

const showImage = (src, name) => {
  placeFullImage.src = src;
  placeFullImage.alt = name;
  popupImageName.textContent = name;
  openPopup(popupFullImage);
}

const createPlaceCard = (item) => {
  const card = placeCardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.place-card__image');
  card.querySelector('.place-card__name').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  card.querySelector('.place-card__like').addEventListener('click', toggleLike);
  card.querySelector('.place-card__delete').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => showImage(item.link, item.name));

  return card;
}

const renderPlaceCard = (items) => {
  const cards = items.map(createPlaceCard);

  placesCardList.append(...cards);
}

renderPlaceCard(initialCards);

const addPlaceCard = (evt) =>  {
  evt.preventDefault();

  const placeCard = {
    name: placeNameInput.value,
    link: placeImageInput.value,
  }

  placesCardList.prepend(createPlaceCard(placeCard));

  closePopup(popupAddPlaceCard);
  resetForm(config, formAddPlaceCard);
}

formAddPlaceCard.addEventListener('submit', addPlaceCard);

buttonAddPlaceCard.addEventListener('click', () => {
  openPopup(popupAddPlaceCard);
});

initProfileEditor();
enableValidation(config);
