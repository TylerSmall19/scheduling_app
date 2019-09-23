import * as loginHelper from '../shared/authFilter';
const handlerToTest = require('../createNewTeam').handler;

describe('Create New Team handler', () => {
  beforeEach(() => { 
    spyOn(loginHelper, 'isLoggedIn').and.callFake((firstProp) => firstProp !== 'fail')
  });

  it('Calls isLoggedIn', () => {
    expect(loginHelper.isLoggedIn).not.toBeCalled();
    handlerToTest();
    expect(loginHelper.isLoggedIn).toBeCalled();
  });

  it('Throws if the user is not logged in', () => { 
    expect.assertions(1);
    expect(handlerToTest('fail')).rejects.toEqual(Error('User not logged in'));
  });

  pending('Need to write these')
  it('Calls isLoggedIn', () => {
    expect(loginHelper.isLoggedIn).not.toBeCalled();
    handlerToTest();
    expect(loginHelper.isLoggedIn).toBeCalled();
  });

  it('Passes the given values into the call to create team', () => { 

  });

  it('Returns the response from createTeam', () => { 

  });
});