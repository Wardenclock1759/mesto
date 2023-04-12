import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._formElement = this._popupElement.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
    
        this._formElement.addEventListener('submit', (event) => {
          event.preventDefault();    
          this._handleSubmit();
        });
    }
}