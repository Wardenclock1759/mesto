export class FormValidator {
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
  
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleSubmitButtonState(inputList) {
        const hasInvalidInput = this._hasInvalidInput(inputList);
    
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
    
        this._toggleSubmitButtonState(this._inputElements);

        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleSubmitButtonState(this._inputElements);
            }, 0);
        });
    
        this._inputElements.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
                    this._toggleSubmitButtonState(this._inputElements);
            });
        });
    }
  
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    
        this._setEventListeners();
    }
}