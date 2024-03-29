import "../pages/index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

import {
  cardListSelector,
  cardTemplateSelector,
  likeButtonActiveClass,
  profileNameSelector,
  profileAboutSelector,
  profilePictureSelector,
  imagePopupSelector,
  photoFormSelector,
  profileFormSelector,
  avatarFormSelector,
  deleteFormSelector,
  addButtonSelector,
  editButtonSelector,
  overlaySelector,
  validationSettings,
  token,
  cohort
} from "../utils/constants.js";

const addButton = document.querySelector(addButtonSelector);
const editButton = document.querySelector(editButtonSelector);
const overlay = document.querySelector(overlaySelector);
const imagePopup = new PopupWithImage(imagePopupSelector);
const profilePopup = new PopupWithForm(profileFormSelector, handleProfileSubmit);
const cardPopup = new PopupWithForm(photoFormSelector, handleCardSubmit);
const deletePopup = new PopupConfirm(deleteFormSelector, handleCardDelete);
const avatarPopup = new PopupWithForm(avatarFormSelector, handleAvatarSubmit);

let cardToDelete = null;
let id = null;

const profileValidation = new FormValidator(validationSettings, document.querySelector(profileFormSelector));
const cardValidation = new FormValidator(validationSettings, document.querySelector(photoFormSelector));
const avatarValidation = new FormValidator(validationSettings, document.querySelector(avatarFormSelector))

const api = new Api({
  baseURL: `https://mesto.nomoreparties.co/v1/${cohort}`,
  mode: "cors",
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

const cardSection = new Section(
  (item) => {
    const cardElement = createCard(item);
    cardSection.addItem(cardElement);
  }, cardListSelector
);

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  aboutSelector: profileAboutSelector,
  pictureSelector: profilePictureSelector
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    cardTemplateSelector,
    () => handleCardClick(cardData),
    handleLikeClick,
    handleDeleteClick
  );
  return card.generateCard(
    card._ownerId === userInfo.getUserInfo().id,
    card._likes.some(user => user._id === userInfo.getUserInfo().id)
  );
}

function handleCardClick(cardData) {
  imagePopup.open(cardData);
}

function handleLikeClick(card) {
  if (card.likeButton.classList.contains(likeButtonActiveClass)) {
    api.unlikeCard(card.id)
    .then(res => {
      if (res) {
        console.log(res.likes)
        card.updateLikeCounter(res.likes ? res.likes.length : 0);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
  else {
    api.likeCard(card.id)
    .then(res => {
      if (res) {
        card.updateLikeCounter(res.likes ? res.likes.length : 0);
        console.log(res.likes.length)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

function handleDeleteClick(card) {
  cardToDelete = card.cardElement;
  id = card.id;
  deletePopup.open();
}

function handleCardDelete() {
  if (cardToDelete && id) {
    api.deleteCard(id)
      .then(res => {
        if (res) {
          cardToDelete.remove();
          cardToDelete = null;
          this.close();
        }
      })
      .catch((err) => {
        console.log(err);
    })
  }
}

function handleProfileSubmit(user) {
  profilePopup.renderText(true);
  api.setProfileInfo(user)
    .then(res => {
      if (res) {
        userInfo.setUserInfo(user);
        this.close();
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderText(false);
    });
}

function handleCardSubmit(cardData) {
  cardPopup.renderText(true);
  api.addCard(cardData)
    .then(res => {
      if (res) {
        const cardElement = createCard(res);
        cardSection.addItem(cardElement); 
        this.close();
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.renderText(false);
  });
}

function handleAvatarSubmit(link) {
  avatarPopup.renderText(true);
  api.updateAvatar(link)
    .then(res => {
      if (res) {
        userInfo.setUserInfo(res);
        this.close();
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderText(false);
    });
}

function handleOverlayClick() {
  avatarValidation.resetErrors();
  avatarPopup.open();
}

function handleEditButtonClick() {
  profileValidation.resetErrors();
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
}

function handleAddButtonClick() {
  cardValidation.resetErrors();
  cardPopup.open();
}

imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);
overlay.addEventListener("click", handleOverlayClick)

profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });