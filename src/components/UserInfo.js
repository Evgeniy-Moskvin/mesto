export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector)
  }
  getUserInfo() {
    return {
      id: this._id,
      name: this._name.textContent,
      job: this._job.textContent,
    }
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }

  setUserInfo({ name, about, _id }) {
    this._id = _id;
    this._name.textContent = name;
    this._job.textContent = about;
  }
}
