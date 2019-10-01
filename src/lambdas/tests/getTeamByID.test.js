import * as loginHelper from '../shared/authFilter';
import { OutgoingAPIClient } from '../shared/lambdaOutgoingAPIClient';
const handlerToTest = require('../teamByID').handler;

describe('Create New Team handler', () => {
  const expectedRes = { foo: 'bar' };

  beforeEach(() => { 
    spyOn(loginHelper, 'isLoggedIn').and.callFake((firstProp) => firstProp !== 'fail');
    spyOn(OutgoingAPIClient, 'getTeamByID').and.callFake(async (id) => 
      {
        if (id !== 'fail')
          return expectedRes;
        else
          throw new Error('Fail requested');
      }
    );
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

  it('Calls the outgoing communication client getTeamByID', async () => {
    expect(OutgoingAPIClient.getTeamByID).not.toBeCalled();
    await handlerToTest();
    expect(OutgoingAPIClient.getTeamByID).toBeCalled();
  });

  it('Calls the outgoing communication client with the given teamID from the query string', async () => { 
    expect(OutgoingAPIClient.getTeamByID).not.toBeCalled();
    await handlerToTest({ queryStringParameters: { teamID: '1' } });
    expect(OutgoingAPIClient.getTeamByID).toBeCalledWith('1');
  });

  it('Returns the response from the outgoing client when successful', async () => { 
    expect(OutgoingAPIClient.getTeamByID).not.toBeCalled();
    const res = await handlerToTest({ queryStringParameters: { teamID: '1' } });
    expect(res.body).toEqual(JSON.stringify({ response: expectedRes }));
    expect(res.statusCode).toBe(200);
  });

  it('Returns an error response from the outgoing client when not successful', async () => { 
    spyOn(console, 'error').and.callFake(() => { });

    expect(OutgoingAPIClient.getTeamByID).not.toBeCalled();
    const res = await handlerToTest({ queryStringParameters: { teamID: 'fail' } });
    expect(res.statusCode).toBe(500);
  });
});