import "./pages/index.css";

import Section from "./components/Section.js";
import Card from "./components/Card.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import FormValidator from "./components/FormValidator.js";

import {
    cards,
    cardListSelector,
    cardTemplateSelector,
    profileNameSelector,
    profileAboutSelector,
    imagePopupSelector,
    photoFormSelector,
    profileFormSelector,
    addButtonSelector,
    editButtonSelector,
    validationSettings
} from "./vendor/constants.js";

const addButton = document.querySelector(addButtonSelector);
const editButton = document.querySelector(editButtonSelector);
const imagePopup = new PopupWithImage(imagePopupSelector);
const profilePopup = new PopupWithForm(profileFormSelector, handleProfileSubmit);
const cardPopup = new PopupWithForm(photoFormSelector, handleCardSubmit);
const forms = Array.from(document.querySelectorAll(validationSettings.formSelector));

const userInfo = new UserInfo({
    nameSelector: profileNameSelector,
    aboutSelector: profileAboutSelector
});

const cardSection = new Section({
    items: cards,
    renderer: (item) => {
        const card = new Card(item, cardTemplateSelector, () => handleCardClick(item));
        const cardElement = card.generateCard();
        cardSection.addItem(cardElement);
    }
}, cardListSelector);

function handleCardClick(cardData) {
    imagePopup.open(cardData);
}

function handleProfileSubmit(user) {
    userInfo.setUserInfo(user);
}

function handleCardSubmit(cardData) {
    const card = new Card(cardData, cardTemplateSelector, () => handleCardClick(cardData));
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
}

imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();

editButton.addEventListener("click", () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    profilePopup.open();
});

addButton.addEventListener("click", () => {
    cardPopup.open();
});

forms.forEach((form) => {
    const formValidator = new FormValidator(validationSettings, form);
    formValidator.enableValidation();
});
cardSection.renderItems();