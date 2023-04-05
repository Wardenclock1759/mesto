export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }
    
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }
  
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }
  
    _hasInvalidInput() {
        return this._inputElements.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleSubmitButtonState() {
        const hasInvalidInput = this._hasInvalidInput();
    
        if (hasInvalidInput) {
            this._submitButtonElement.classList.add(this._settings.inactiveButtonClass);
            this._submitButtonElement.disabled = true;
        } else {
            this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
            this._submitButtonElement.disabled = false;
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
  
    _setEventListeners() {
        this._inputElements = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    
        this._toggleSubmitButtonState();
        
        this._inputElements.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
                    this._toggleSubmitButtonState();
            });
        });
    }
  
    enableValidation() {
        this._setEventListeners();
    }

    resetErrors() {
        this._inputElements.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleSubmitButtonState();
    }
}