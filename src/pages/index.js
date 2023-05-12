import './index.css';

import { config } from '../utils/config.js';

import Card from '../components/Card.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

import { api } from '../components/Api';

import {
  popupWithImageSelector,
  placesCardListSelector,
  placeCardTemplateSelector,
  popupAddPlaceCardSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupWidthConfirmationSelector,
  buttonEditProfile,
  buttonAddPlaceCard,
  formEditProfile,
  formAddPlaceCard,
  formEditAvatar,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  avatar,
} from '../utils/constants.js';


const formEditProfileValidate = new FormValidator(config, formEditProfile);
const formAddPlaceCardValidate = new FormValidator(config, formAddPlaceCard);
const formEditAvatarValidate = new FormValidator(config, formEditAvatar);

const userInfo = new UserInfo({
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
});


const placeCard = new Section({}, placesCardListSelector);

const addPlaceCard = ({ name, image: link }) => {
  popupAddPlaceCard.sending(false);
  api.addCard({ name, link })
    .then((res) => {
      placeCard.addItem(createPlaceCard(res));
      popupAddPlaceCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddPlaceCard.sending(true);
    })
}

const handleCardClick = (src, name) => {
  popupWithImage.open(src, name);
}

const createPlaceCard = ({ name, link, likes, owner, _id }) => {

  const card = new Card(
    { name, link, likes, owner, _id },
    placeCardTemplateSelector,
    handleCardClick,
    (card) => {
      popupWithConfirmation.open(card);
    },
    userInfo.getUserInfo().id,
    (card) => {
      api.setLike(card._id)
        .then((res) => {
          card.updateLikeCount(res.likes.length);
        })
        .catch(err => console.log(err))
    },
    (card) => {
      api.removeLike(card._id)
        .then((res) => {
          card.updateLikeCount(res.likes.length);
        })
        .catch(err => console.log(err))
    }
  );
  return card.createCard();
}

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then((res) => {
    const user = res[0];
    const initialCards = res[1];

    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);

    const placeCards = new Section({
      items: initialCards,
      renderer: createPlaceCard,
    }, placesCardListSelector);

    placeCards.rendererItems();
  })
  .catch(err => console.log(err));


buttonAddPlaceCard.addEventListener('click', () => {
  popupAddPlaceCard.open();
});


const editProfile = ({ name, job: about }) => {
  popupEditProfile.sending(false);
  api.updateUserInfo({ name, about })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupEditProfile.sending(true);
    });
}

const editAvatar = (avatar) => {
  popupEditAvatar.sending(false);
}

buttonEditProfile.addEventListener('click', () => {
  initProfileEditor();
  popupEditProfile.open();
});

avatar.addEventListener('click', () => {
  popupEditAvatar.open();
});


const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const popupAddPlaceCard = new PopupWithForm(popupAddPlaceCardSelector, addPlaceCard);
popupAddPlaceCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, editProfile);
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector);
popupEditAvatar.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  popupWidthConfirmationSelector,
  (card) => {
    api.removeCard(card._id)
      .then((res) => {
        popupWithConfirmation.close();
        card.deleteCard();
      })
      .catch(err => console.log(err))
  }
)
popupWithConfirmation.setEventListeners();

const initProfileEditor = () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
}

initProfileEditor();


formEditProfileValidate.enableValidation();
formAddPlaceCardValidate.enableValidation();
formEditAvatarValidate.enableValidation();
