const editButton = document.querySelector(".profile__edit-button"); 
const addButton = document.querySelector(".profile__add-button");
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

const displayContainer = document.querySelector(".display");
const displayImage = document.querySelector(".display__image");
const displayName = document.querySelector(".display__name");
const displayCloseButton = document.querySelector(".display__close-button");

function toggleDisplayContainer() {
    displayContainer.classList.toggle("display_opened");
}

displayCloseButton.addEventListener("click", () => {
    toggleDisplayContainer();
});

function openImageDisplay(imageName, imageURL) {
    displayName.textContent = imageName;
    displayImage.setAttribute("style", "content: url("+imageURL+")");
    toggleDisplayContainer();
}

function addPhoto(textValue, imageURL) {
    const photoTemplate = document.querySelector('#element-template').content;
    const photoElement = photoTemplate.querySelector('.elements__element').cloneNode(true);
    const likeButton = photoElement.querySelector('.elements__like-button');
    const deleteButton = photoElement.querySelector('.elements__delete-button');
    const image = photoElement.querySelector('.elements__image');

    photoElement.querySelector('.elements__text').textContent = textValue;
    image.src = imageURL;
    
    image.addEventListener("click", () => {
        openImageDisplay(textValue, imageURL)
    });
    deleteButton.addEventListener("click", () => {
        elementsList.removeChild(deleteButton.parentElement.parentElement);
    });
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("elements__like-button_active");
    });

    elementsList.prepend(photoElement);
}

initialCards.forEach((element) => {
    addPhoto(element.name, element.link)
});

const profileFormContainer = document.querySelector("#popup__content_profile"); 
const profileForm = profileFormContainer.querySelector("#form_profile"); 
const closeProfileButton = document.querySelector("#btn_close_profile"); 

const nameInput = profileFormContainer.querySelector("#name-input"); 
const jobInput = profileFormContainer.querySelector("#about-input"); 

const nameText = document.querySelector(".profile__title"); 
const jobText = document.querySelector(".profile__subtitle"); 

function toggleProfilePopup() {
    profileFormContainer.classList.toggle("popup_opened");
}

editButton.addEventListener("click", () => {
    toggleProfilePopup();
    nameInput.value = nameText.textContent;
    jobInput.value = jobText.textContent;
});

closeProfileButton.addEventListener("click", () => {
    toggleProfilePopup();
});

function handleProfileSubmit (evt) {
    evt.preventDefault();

    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;

    toggleProfilePopup();
}
profileForm.addEventListener('submit', handleProfileSubmit); 

const photoFormContainer = document.querySelector("#popup__content_photo"); 
const photoForm = photoFormContainer.querySelector("#form_photo"); 
const closePhotoButton = document.querySelector("#btn_close_photo"); 

const titleInput = photoFormContainer.querySelector("#title-input"); 
const urlInput = photoFormContainer.querySelector("#url-input"); 

function togglePhotoPopup() {
    photoFormContainer.classList.toggle("popup_opened");
}

addButton.addEventListener("click", () => {
    togglePhotoPopup();
});

closePhotoButton.addEventListener("click", () => {
    togglePhotoPopup();
});

function handlePhotoSubmit (evt) {
    evt.preventDefault();
    addPhoto(titleInput.value, urlInput.value);
    titleInput.value='';
    urlInput.value='';
    togglePhotoPopup();
}
photoForm.addEventListener('submit', handlePhotoSubmit); 