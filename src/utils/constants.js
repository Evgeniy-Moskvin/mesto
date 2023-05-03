const popupEditProfile = document.querySelector('.popup_name_edit-profile');
const popupAddPlaceCard = document.querySelector('.popup_name_add-place-card');
const popupFullImage = document.querySelector('.popup_name_full-image');
const popupImageName = popupFullImage.querySelector('.popup__image-name');
const popups = document.querySelectorAll('.popup');

const formEditProfile = document.forms['form-edit-profile'];
const profileNameInput = formEditProfile.querySelector('.form__input_name_name');
const profileJobInput = formEditProfile.querySelector('.form__input_name_job');
const buttonEditProfile = document.querySelector('.button-edit');
const buttonAddPlaceCard = document.querySelector('.button-add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//const placesCardList = document.querySelector('.places__grid');
export const placesCardListSelector = '.places__grid';
export const placeCardTemplateSelector = '#place-card-template';
const formAddPlaceCard = document.forms['form-add-place-card'];
const placeNameInput = formAddPlaceCard.querySelector('.form__input_name_name');
const placeImageInput = formAddPlaceCard.querySelector('.form__input_name_image');
const placeFullImage = popupFullImage.querySelector('.popup__image');
