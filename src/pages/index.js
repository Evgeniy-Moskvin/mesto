import './index.css';

import { config } from '../utils/config.js';
import { initialCards } from '../utils/data.js';

import Card from '../components/Card.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  popupWithImageSelector,
  placesCardListSelector,
  placeCardTemplateSelector,
  popupAddPlaceCardSelector,
  popupEditProfileSelector,
  buttonEditProfile,
  buttonAddPlaceCard,
} from '../utils/constants.js';

//const popupEditProfile = document.querySelector('.popup_name_edit-profile');
//const popupAddPlaceCard = document.querySelector('.popup_name_add-place-card');
const popupFullImage = document.querySelector('.popup_name_full-image');
const popupImageName = popupFullImage.querySelector('.popup__image-name');
const popups = document.querySelectorAll('.popup');

const formEditProfile = document.forms['form-edit-profile'];
const profileNameInput = formEditProfile.querySelector('.form__input_name_name');
const profileJobInput = formEditProfile.querySelector('.form__input_name_job');
//const buttonEditProfile = document.querySelector('.button-edit');
//const buttonAddPlaceCard = document.querySelector('.button-add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formAddPlaceCard = document.forms['form-add-place-card'];
const placeNameInput = formAddPlaceCard.querySelector('.form__input_name_name');
const placeImageInput = formAddPlaceCard.querySelector('.form__input_name_image');
const placeFullImage = popupFullImage.querySelector('.popup__image');


import { FormValidator } from '../components/FormValidator.js';
import { data } from 'autoprefixer';
//import PopupWithFrom from '../components/PopupWithForm.js';

const formEditProfileValidate = new FormValidator(config, formEditProfile);
const formAddPlaceCardValidate = new FormValidator(config, formAddPlaceCard);

// POPUPS
// ======

/*const openPopup = (popup) => {
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
}*/

/*popups.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popupElement)
    }
  });
});*/

const addPlaceCard = ({ name, image: link }) => {
  placeCard.addItem(createPlaceCard({ name, link }))
}

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const popupAddPlaceCard = new PopupWithForm(popupAddPlaceCardSelector, addPlaceCard);
popupAddPlaceCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, () => {

});
popupEditProfile.setEventListeners();

const handleCardClick = (src, name) => {
  popupWithImage.open(src, name);
}


buttonAddPlaceCard.addEventListener('click', () => {
  popupAddPlaceCard.open();
});

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
})


// PROFILE
// =======

const initProfileEditor = () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

/*const editProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(popupEditProfile);
}*/

/*formEditProfile.addEventListener('submit', editProfile);*/

/*buttonEditProfile.addEventListener('click', () => {
  formEditProfileValidate.resetForm();
  initProfileEditor();
  openPopup(popupEditProfile);
});*/

initProfileEditor();
formEditProfileValidate.enableValidation();


// CARDS
// =====

const createPlaceCard = ({ name, link }) => {
  const card = new Card({ name, link }, placeCardTemplateSelector, handleCardClick);
  return card.createCard();
}

const placeCard = new Section({
  items: initialCards,
  renderer: createPlaceCard,
}, placesCardListSelector);

placeCard.rendererItems();


/*export const showImage = (src, name) => {
  placeFullImage.src = src;
  placeFullImage.alt = name;
  popupImageName.textContent = name;
  openPopup(popupFullImage);
}*/


/*const renderPlaceCard = (item) => {
  const cards = item.map(createPlaceCard);
  placesCardList.append(...cards);
}*/

/*const addPlaceCard = (evt) => {
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

formAddPlaceCard.addEventListener('submit', addPlaceCard);*/

/*buttonAddPlaceCard.addEventListener('click', () => {
  openPopup(popupAddPlaceCard);
});*/


formAddPlaceCardValidate.enableValidation();
