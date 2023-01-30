const likeButtons = document.querySelectorAll(".elements__like-button"); 
const editButton = document.querySelector(".profile__edit-button"); 

likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("elements__like-button_active")
    });
});

let formElement = document.querySelector(".popup"); 
let nameText = document.querySelector(".profile__title"); 
let jobText = document.querySelector(".profile__subtitle"); 

editButton.addEventListener("click", () => {
    formElement.classList.toggle("popup_opened")
});

function handleFormSubmit (evt) {
    evt.preventDefault();

    let nameInput = document.querySelector(".popup__title-input"); 
    let jobInput = document.querySelector(".popup__subtitle-input"); 

    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;

    formElement.classList.toggle("popup_opened")
}

formElement.addEventListener('submit', handleFormSubmit); 