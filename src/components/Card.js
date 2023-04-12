export default class Card {
  constructor(cardData, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode(true);
    return cardTemplate;
  }

  _handleToggle() {
    this._likeButton.classList.toggle('elements__like-button_active');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick());

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick({
        likeButton: this._likeButton,
        id: this._id,
        updateLikeCounter: this.updateLikeCounter.bind(this)
      });
      this._handleToggle();
    }); 

    this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick({
          cardElement: this._element,
          id: this._id,
          updateLikeCounter: this.updateLikeCounter.bind(this)
        });
    });
  }

  generateCard(canDelete, isLiked) {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._likeCounter = this._element.querySelector('.elements__counter');

    this._cardImage.src = this._link;
    this._cardImage.alt = "Изображение: " + this._name;
    this._element.querySelector('.elements__text').textContent = this._name;
    this._element.querySelector('.elements__counter').textContent = this._likes ? this._likes.length : 0;

    if (isLiked) {
      this._handleToggle();
    }

    if (!canDelete) {
      this._deleteButton.style.display = 'none';
    }

    this._setEventListeners();

    return this._element;
  }

  updateLikeCounter(likes) {
    this._element.querySelector('.elements__counter').textContent = likes;
  }
}