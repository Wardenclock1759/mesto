const likeButtons = document.querySelectorAll(".elements__like-button"); 
const editButton = document.querySelector(".profile__edit-button"); 
const closeButton = document.querySelector(".popup__close-button"); 

likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("elements__like-button_active")
    });
});

let formElement = document.querySelector(".popup"); 
let nameText = document.querySelector(".profile__title"); 
let jobText = document.querySelector(".profile__subtitle"); 

let nameInput = document.querySelector(".popup__title-input"); 
let jobInput = document.querySelector(".popup__subtitle-input"); 

editButton.addEventListener("click", () => {
    formElement.classList.toggle("popup_opened")
    nameInput.value = nameText.textContent;
    jobInput.value = jobText.textContent;
});

closeButton.addEventListener("click", () => {
    formElement.classList.toggle("popup_opened")
});

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;

    formElement.classList.toggle("popup_opened")
}

formElement.addEventListener('submit', handleFormSubmit); 