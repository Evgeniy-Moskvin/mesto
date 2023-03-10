import { initialCards } from "./data.js";
import { Card } from "./Card.js";
import { config } from "./config.js";
import { FormValidator } from "./FormValidator.js";

const formEditProfileValidate = new FormValidator(config, formEditProfile);
const formAddPlaceCardValidate = new FormValidator(config, formAddPlaceCard);

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

const editProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', editProfile);

buttonEditProfile.addEventListener('click', () => {
  formEditProfileValidate.resetForm();
  initProfileEditor();
  openPopup(popupEditProfile);
});

initProfileEditor();
formEditProfileValidate.enableValidation();



// CARDS
// =====

export const showImage = (src, name) => {
  placeFullImage.src = src;
  placeFullImage.alt = name;
  popupImageName.textContent = name;
  openPopup(popupFullImage);
}

const createPlaceCard = ({name, link}) => {
  const card = new Card({name, link}, placeCardTemplateSelector);
  return card.createCard();
}

const renderPlaceCard = (item) => {
  const cards = item.map(createPlaceCard);
  placesCardList.append(...cards);
}

const addPlaceCard = (evt) => {
  evt.preventDefault();

  const placeCard = {
    name: placeNameInput.value,
    link: placeImageInput.value,
  }

  const card = new Card(placeCard, placeCardTemplateSelector)
  placesCardList.prepend(card.createCard());

  closePopup(popupAddPlaceCard);
  formAddPlaceCardValidate.resetForm();
}

formAddPlaceCard.addEventListener('submit', addPlaceCard);

buttonAddPlaceCard.addEventListener('click', () => {
  openPopup(popupAddPlaceCard);
});

renderPlaceCard(initialCards);
formAddPlaceCardValidate.enableValidation();
