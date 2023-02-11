const editButton = document.querySelector(".profile__edit-button"); 
const closeButton = document.querySelector(".popup__close-button"); 
const elementsList = document.querySelector(".elements__list"); 

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

function addPhoto(textValue, imageURL) {
    const photoTemplate = document.querySelector('#element-template').content;
    const photoElement = photoTemplate.querySelector('.elements__element').cloneNode(true);

    photoElement.querySelector('.elements__text').textContent = textValue;
    photoElement.querySelector('.elements__image').src = imageURL;

    elementsList.prepend(photoElement);
}

initialCards.forEach((element) => {
    addPhoto(element.name, element.link)
});

function renderButtons() {
    const likeButtons = document.querySelectorAll(".elements__like-button"); 
    likeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("elements__like-button_active");
        });
    });
    
    const deleteButtons = document.querySelectorAll(".elements__delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            elementsList.removeChild(button.parentElement.parentElement)
        });
    });
}
renderButtons();

const formContainer = document.querySelector(".popup"); 
const form = document.querySelector(".popup__form"); 
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