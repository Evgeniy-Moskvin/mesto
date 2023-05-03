import './index.css';

import { config } from '../utils/config.js';
import { initialCards } from '../utils/data.js';

import Card from '../components/Card.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

import {
  popupWithImageSelector,
  placesCardListSelector,
  placeCardTemplateSelector,
  popupAddPlaceCardSelector,
  popupEditProfileSelector,
  buttonEditProfile,
  buttonAddPlaceCard,
  formEditProfile,
  formAddPlaceCard,
  profileNameSelector,
  profileJobSelector,
  profileNameInput,
  profileJobInput,
} from '../utils/constants.js';


const formEditProfileValidate = new FormValidator(config, formEditProfile);
const formAddPlaceCardValidate = new FormValidator(config, formAddPlaceCard);

const userInfo = new UserInfo({ profileNameSelector, profileJobSelector });


const addPlaceCard = ({ name, image: link }) => {
  placeCard.addItem(createPlaceCard({ name, link }))
}

const handleCardClick = (src, name) => {
  popupWithImage.open(src, name);
}

const createPlaceCard = ({ name, link }) => {
  const card = new Card({ name, link }, placeCardTemplateSelector, handleCardClick);
  return card.createCard();
}

const placeCard = new Section({
  items: initialCards,
  renderer: createPlaceCard,
}, placesCardListSelector);

placeCard.rendererItems();

buttonAddPlaceCard.addEventListener('click', () => {
  popupAddPlaceCard.open();
});


const initProfileEditor = () => {
  profileNameInput.value = userInfo.getUserInfo().name;
  profileJobInput.value = userInfo.getUserInfo().job;
}

initProfileEditor();

const editProfile = ({ name, job }) => {
  userInfo.setUserInfo({ name, job });
}

buttonEditProfile.addEventListener('click', () => {
  initProfileEditor();
  popupEditProfile.open();
})


const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const popupAddPlaceCard = new PopupWithForm(popupAddPlaceCardSelector, addPlaceCard);
popupAddPlaceCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, editProfile);
popupEditProfile.setEventListeners();


formEditProfileValidate.enableValidation();
formAddPlaceCardValidate.enableValidation();
