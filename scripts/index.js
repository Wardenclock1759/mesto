const editButton = document.querySelector(".profile__edit-button"); 
const addButton = document.querySelector(".profile__add-button");
const elementsList = document.querySelector(".elements__list"); 

const albumFormContainer = document.querySelector("#popup__content_album"); 
const displayImage = document.querySelector(".popup__image");
const displayName = document.querySelector(".popup__title");
const displayCloseButton = document.querySelector("#btn_close_album");

const profileFormContainer = document.querySelector("#popup__content_profile"); 
const profileForm = profileFormContainer.querySelector("#form_profile"); 
const closeProfileButton = document.querySelector("#btn_close_profile"); 
const nameInput = profileFormContainer.querySelector("#name-input"); 
const jobInput = profileFormContainer.querySelector("#about-input"); 
const nameText = document.querySelector(".profile__title"); 
const jobText = document.querySelector(".profile__subtitle"); 

const photoFormContainer = document.querySelector("#popup__content_photo"); 
const photoForm = photoFormContainer.querySelector("#form_photo"); 
const closePhotoButton = document.querySelector("#btn_close_photo"); 
const titleInput = photoFormContainer.querySelector("#title-input"); 
const urlInput = photoFormContainer.querySelector("#url-input"); 

function openPopup(popupWindow) {
    if (!popupWindow.classList.contains("popup_opened")) {
        popupWindow.classList.add("popup_opened");
    }
}

function closePopup(popupWindow) {
    if (popupWindow.classList.contains("popup_opened")) {
        popupWindow.classList.remove("popup_opened");
    }
}

function openImageDisplay(imageName, imageURL) {
    displayName.textContent = imageName;
    displayImage.setAttribute("style", "content: url("+imageURL+")");
    openPopup(albumFormContainer);
}

function createPhoto(textValue, imageURL) {
    const photoTemplate = document.querySelector('#element-template').content;
    const photoElement = photoTemplate.querySelector('.elements__element').cloneNode(true);
    const likeButton = photoElement.querySelector('.elements__like-button');
    const deleteButton = photoElement.querySelector('.elements__delete-button');
    const image = photoElement.querySelector('.elements__image');

    photoElement.querySelector('.elements__text').textContent = textValue;
    image.src = imageURL;
    image.alt = "Изображение: " + textValue;
    
    image.addEventListener("click", () => {
        openImageDisplay(textValue, imageURL)
    });
    deleteButton.addEventListener("click", () => {
        photoElement.remove();
    });
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("elements__like-button_active");
    });

    return photoElement;
}

function handlePhotoSubmit (evt) {
    evt.preventDefault();
    elementsList.prepend(createPhoto(titleInput.value, urlInput.value));
    
    closePopup(photoFormContainer);
    titleInput.value='';
    urlInput.value='';
}

function handleProfileSubmit (evt) {
    evt.preventDefault();

    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;

    closePopup(profileFormContainer);
}

addButton.addEventListener("click", () => {
    openPopup(photoFormContainer);
});

closePhotoButton.addEventListener("click", () => {
    closePopup(photoFormContainer);
});

editButton.addEventListener("click", () => {
    openPopup(profileFormContainer);
    nameInput.value = nameText.textContent;
    jobInput.value = jobText.textContent;
});

closeProfileButton.addEventListener("click", () => {
    closePopup(profileFormContainer);
});

displayCloseButton.addEventListener("click", () => {
    closePopup(albumFormContainer);
});

photoForm.addEventListener('submit', handlePhotoSubmit); 
profileForm.addEventListener('submit', handleProfileSubmit); 

initialCards.forEach((element) => {
    elementsList.append(createPhoto(element.name, element.link));
});