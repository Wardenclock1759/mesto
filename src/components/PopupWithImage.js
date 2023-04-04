import Popup from "./Popup";

export default class PopupWithImage extends Popup {
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