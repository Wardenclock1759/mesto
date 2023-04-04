import "../pages/index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

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
} from "../utils/constants.js";

const addButton = document.querySelector(addButtonSelector);
const editButton = document.querySelector(editButtonSelector);
const imagePopup = new PopupWithImage(imagePopupSelector);
const profilePopup = new PopupWithForm(profileFormSelector, handleProfileSubmit);
const cardPopup = new PopupWithForm(photoFormSelector, handleCardSubmit);

const profileValidation = new FormValidator(validationSettings, document.querySelector(profileFormSelector));
const cardValidation = new FormValidator(validationSettings, document.querySelector(photoFormSelector));

const userInfo = new UserInfo({
    nameSelector: profileNameSelector,
    aboutSelector: profileAboutSelector
});

const cardSection = new Section(
    (item) => {
        const card = new Card(item, cardTemplateSelector, () => handleCardClick(item));
        const cardElement = card.generateCard();
        cardSection.addItem(cardElement);
    }, cardListSelector);

function handleCardClick(cardData) {
    imagePopup.open(cardData);
}

function handleProfileSubmit(user) {
    userInfo.setUserInfo(user);
    this.close();
}

function handleCardSubmit(cardData) {
    const card = new Card(cardData, cardTemplateSelector, () => handleCardClick(cardData));
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
    this.close();
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

editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);

profileValidation.enableValidation();
cardValidation.enableValidation();
cardSection.renderItems(cards);