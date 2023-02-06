const likeButtons = document.querySelectorAll(".elements__like-button"); 
const editButton = document.querySelector(".profile__edit-button"); 
const closeButton = document.querySelector(".popup__close-button"); 

likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("elements__like-button_active");
    });
});

let formContainer = document.querySelector(".popup"); 
let form = document.querySelector(".popup__form"); 
let nameText = document.querySelector(".profile__title"); 
let jobText = document.querySelector(".profile__subtitle"); 

let nameInput = document.querySelector("#name-input"); 
let jobInput = document.querySelector("#about-input"); 

function togglePoput() {
    formContainer.classList.toggle("popup_opened");
}

editButton.addEventListener("click", () => {
    togglePoput();
    nameInput.value = nameText.textContent;
    jobInput.value = jobText.textContent;
});

closeButton.addEventListener("click", () => {
    togglePoput();
});

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;

    togglePoput();
}

form.addEventListener('submit', handleFormSubmit); 