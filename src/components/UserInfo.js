export default class UserInfo {
    constructor({ nameSelector, aboutSelector, pictureSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._pictureElement = document.querySelector(pictureSelector);
        this._id = null;
    }

    getUserInfo() {
        const name = this._nameElement.textContent;
        const about = this._aboutElement.textContent;
        const id = this._id;
        return { name, about, id };
    }

    setUserInfo(user) {
        if (user.name) {
            this._nameElement.textContent = user.name;
        }
        if (user.about) {
            this._aboutElement.textContent = user.about;
        }
        if (user._id) {
            this._id = user._id;
        }        
        if (user.avatar) {
            this._pictureElement.src = user.avatar;
        }
    }
}