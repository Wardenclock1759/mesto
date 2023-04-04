export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        const name = this._nameElement.textContent;
        const about = this._aboutElement.textContent;
        return { name, about };
    }

    setUserInfo(user) {
        this._nameElement.textContent = user.name;
        this._aboutElement.textContent = user.about;
    }
}