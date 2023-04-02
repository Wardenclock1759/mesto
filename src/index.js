import "./pages/index.css";

import { cardsList } from "./scripts/data.js";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { ImagePopup, ProfilePopup, CreatePopup} from "./scripts/popup.js";

const photoFormContainer = document.querySelector("#popup__content_photo"); 
const profileFormContainer = document.querySelector("#popup__content_profile"); 
const elementsList = document.querySelector(".elements__list"); 

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button"); 
const nameText = document.querySelector(".profile__title"); 
const aboutText = document.querySelector(".profile__subtitle"); 

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
const imagePopup = new ImagePopup("#popup__content_album");
const profilePopup = new ProfilePopup("#popup__content_profile", () => handleProfileSubmit(document.querySelector(".profile__title"), document.querySelector(".profile__subtitle")));
const createCardPopup = new CreatePopup("#popup__content_photo", () => handleCreateCardSubmit());

function handleCardClick(cardData) {
    imagePopup.open(cardData);
}

function handleProfileSubmit(nameElement, aboutElement) {
    const nameInput = profileFormContainer.querySelector("#name-input"); 
    const aboutInput = profileFormContainer.querySelector("#about-input"); 

    nameElement.textContent = nameInput.value;
    aboutElement.textContent = aboutInput.value;

    profilePopup.close();
}

function createCard(cardData) {
    const card = new Card(cardData, "#element-template", () => handleCardClick(cardData));
    const cardElement = card.generateCard();
    return cardElement;
}

function handleCreateCardSubmit() {
    const titleInput = photoFormContainer.querySelector("#title-input"); 
    const urlInput = photoFormContainer.querySelector("#url-input"); 

    const cardData = {
        name: titleInput.value,
        link: urlInput.value
    };

    const card = createCard(cardData);
    elementsList.prepend(card);

    createCardPopup.close();
}

editButton.addEventListener("click", () => {
    profilePopup.open(nameText.textContent, aboutText.textContent);
});

addButton.addEventListener("click", () => {
    createCardPopup.open();
});

imagePopup.setEventListeners();
profilePopup.setEventListeners();
createCardPopup.setEventListeners();

formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
});

cardsList.forEach((element) => {
    const card = createCard(element);
    elementsList.append(card);
});