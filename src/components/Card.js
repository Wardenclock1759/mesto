export default class Card {
    constructor(cardData, templateSelector, handleCardClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode(true);
        return cardTemplate;
    }
  
    _handleLikeClick() {
        this._likeButton.classList.toggle('elements__like-button_active');
    }
  
    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._handleCardClick());
        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
    }

    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.elements__image');
      this._likeButton = this._element.querySelector('.elements__like-button');
      this._deleteButton = this._element.querySelector('.elements__delete-button');
  
      this._cardImage.src = this._link;
      this._cardImage.alt = "Изображение: " + this._name;
      this._element.querySelector('.elements__text').textContent = this._name;
  
      this._setEventListeners();
  
      return this._element;
    }
}