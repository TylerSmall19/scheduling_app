export const IdentityService = {
  _rawUser: () => JSON.parse(window.localStorage.getItem('gotrue.user')),

  getUser: function () {
    return this._rawUser();
  },

  getToken: function () {
    return this._rawUser().token;
  }
}