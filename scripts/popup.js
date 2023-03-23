export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
          this.close();
      }
    });
  }
}

export class ImagePopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupTitle = this._popupElement.querySelector('.popup__title');
  }

  open(cardData) {
    this._popupImage.setAttribute("style", "content: url("+cardData.link+")");
    this._popupTitle.textContent = cardData.name;

    super.open();
  }
}
  
export class ProfilePopup extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._nameElement = this._popupElement.querySelector("#name-input");
    this._descriptionElement = this._popupElement.querySelector("#about-input");
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
      evt.target.reset();
    });
  }

  open(name, description) {
    this._nameElement.value = name;
    this._descriptionElement.value = description;

    super.open();
  }
}

export class CreatePopup extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
      evt.target.reset();
    });
  }
}