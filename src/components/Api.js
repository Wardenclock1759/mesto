export default class Api {
    constructor(options) {
        this._options = options;
    }

    getInitialCards() {
        return fetch(this._options.baseURL+"/cards", this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addCard(cardData) {
        this._options.body = JSON.stringify(cardData);
        this._options.method = "POST";
        return fetch(this._options.baseURL+"/cards", this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(id) {
        this._options.method = "DELETE";
        return fetch(this._options.baseURL+`/cards/${id}`, this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getProfileInfo() {
        return fetch(this._options.baseURL+"/users/me", this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setProfileInfo(userInfo) {
        this._options.body = JSON.stringify(userInfo);
        this._options.method = "PATCH";
        return fetch(this._options.baseURL+"/users/me", this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    updateAvatar(data) {
        this._options.body = JSON.stringify(data);
        this._options.method = "PATCH";
        return fetch(this._options.baseURL+"/users/me/avatar", this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    likeCard(id) {
        this._options.method = "PUT";
        return fetch(this._options.baseURL+`/cards/${id}/likes`, this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    unlikeCard(id) {
        this._options.method = "DELETE";
        console.log("DELETE")
        return fetch(this._options.baseURL+`/cards/${id}/likes`, this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}