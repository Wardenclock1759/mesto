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
// const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
// const imagePopup = new ImagePopup("#popup__content_album");
// const profilePopup = new ProfilePopup("#popup__content_profile", () => handleProfileSubmit(document.querySelector(".profile__title"), document.querySelector(".profile__subtitle")));
// const createCardPopup = new CreatePopup("#popup__content_photo", () => handleCreateCardSubmit());

// function handleCardClick(cardData) {
//     imagePopup.open(cardData);
// }

// function handleProfileSubmit(nameElement, aboutElement) {
//     const nameInput = profileFormContainer.querySelector("#name-input"); 
//     const aboutInput = profileFormContainer.querySelector("#about-input"); 

//     nameElement.textContent = nameInput.value;
//     aboutElement.textContent = aboutInput.value;

//     profilePopup.close();
// }

// function createCard(cardData) {
//     const card = new Card(cardData, "#element-template", () => handleCardClick(cardData));
//     const cardElement = card.generateCard();
//     return cardElement;
// }

// function handleCreateCardSubmit() {
//     const titleInput = photoFormContainer.querySelector("#title-input"); 
//     const urlInput = photoFormContainer.querySelector("#url-input"); 

//     const cardData = {
//         name: titleInput.value,
//         link: urlInput.value
//     };

//     const card = createCard(cardData);
//     elementsList.prepend(card);

//     createCardPopup.close();
// }

// editButton.addEventListener("click", () => {
//     profilePopup.open(nameText.textContent, aboutText.textContent);
// });

// addButton.addEventListener("click", () => {
//     createCardPopup.open();
// });

// imagePopup.setEventListeners();
// profilePopup.setEventListeners();
// createCardPopup.setEventListeners();

// formList.forEach((formElement) => {
//     const formValidator = new FormValidator(validationSettings, formElement);
//     formValidator.enableValidation();
// });

// cardsList.forEach((element) => {
//     const card = createCard(element);
//     elementsList.append(card);
// });