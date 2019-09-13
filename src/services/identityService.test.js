describe('Identity Service', () => { 
  let serviceToTest;
  const fakeUser = {user: {token: {foo: 'bar'}}};
  const fakeStore = jest.fn(() => JSON.stringify(fakeUser));

  beforeEach(() => {
    spyOn(global, 'window', 'get').and.returnValue({localStorage: { getItem: fakeStore }})
    window.localStorage.getItem = fakeStore;
    serviceToTest = require('./identityService').IdentityService;
  });

  describe('GetUser', () => { 
    it('Calls the window localStorage with the key "gotrueUser"', () => {
      expect(window.localStorage.getItem).not.toBeCalled();
      serviceToTest.getUser();
      expect(window.localStorage.getItem).toBeCalledWith('gotrue.user');
    });

    it('Returns the object that is found in the local store', () => { 
      const res = serviceToTest.getUser();
      expect(res).toEqual(fakeUser);
    });
  });

  describe('GetToken', () => { 
    it('Returns the object that is found in the local store with the key "token', () => { 
      const res = serviceToTest.getToken();
      expect(res).toEqual(fakeUser.token);
    });
  });
});