const _gotrueUser = JSON.parse(window.localStorage.getItem('gotrue.user'));

export const IdentityService = {
  getUser: () => {
    return _gotrueUser;
  },

  getToken: () => {
    return _gotrueUser.token;
  }
}