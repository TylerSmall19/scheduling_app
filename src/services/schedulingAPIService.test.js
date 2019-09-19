import { SchedulingAPI } from "./schedulingAPIService";
import { IdentityService } from "./identityService";
import { schedulingAPIRoutes } from "../constants/appRoutes";

describe('Scheduling API Service', () => {
  beforeEach(() => { 
    spyOn(IdentityService, 'getToken').and.callFake(() => ({ access_token: 'token' }));
  });

  describe('Constructor', () => { 
    it('Sets the _client property', () => { 
      const systemToTest = new SchedulingAPI();
      expect(systemToTest._client).toBeDefined();
    });

    it('Sets the client as a function', () => { 
      const systemToTest = new SchedulingAPI();
      expect(typeof systemToTest._client).toBe('function');
    });

    it('Sets a client function with two params', () => { 
      const systemToTest = new SchedulingAPI();
      expect(systemToTest._client.length).toBe(2);
    });

    it('Sets the client to the given client when passed', () => {
      const fooClient = {foo: 'bar'}
      const systemToTest = new SchedulingAPI(fooClient);
      expect(systemToTest._client).toBe(fooClient);
    });

    it('Calls to the identity service .getToken when no client is given', () => { 
      expect(IdentityService.getToken).not.toBeCalled();
      new SchedulingAPI();
      expect(IdentityService.getToken).toBeCalled();
    });
  });

  describe('CreateNewTeam', () => {
    let apiToTest;
    let mockClient;
    let expectedMockJson = { test: 'passes' };
    const expectedError = new Error('fail requested');

    beforeEach(() => { 
      mockClient = jest.fn().mockImplementation(async (url, vals) => { 
        if (vals && vals.body && JSON.parse(vals.body).fail)
          throw expectedError;
        else
          return { json: async () => expectedMockJson};
       });
      apiToTest = new SchedulingAPI(mockClient)
    });

    it('Calls the client', async () => { 
      expect(mockClient).not.toBeCalled();
      await apiToTest.createNewTeam({});
      expect(mockClient).toBeCalled();
    });

    it('Calls the client with a proper URL for creating a team', async () => { 
      expect(mockClient).not.toBeCalled();
      await apiToTest.createNewTeam({});
      expect(mockClient.mock.calls[0][0]).toBe(schedulingAPIRoutes.createNewTeam());
    });

    it('Calls the client with a proper "method" for creating a team (post)', async () => { 
      expect(mockClient).not.toBeCalled();
      await apiToTest.createNewTeam({});
      expect(mockClient.mock.calls[0][1].method).toBe('POST');
    });

    it('Calls the client with the passed body, but stringified', async () => { 
      expect(mockClient).not.toBeCalled();
      const expectedBody = {foo: 'bar', buzz: 'bazz'};
      await apiToTest.createNewTeam(expectedBody);
      expect(mockClient.mock.calls[0][1].body).toBe(JSON.stringify(expectedBody));
    });

    it('Resolves with .json() when successful', async () => {
      expect.assertions(1);
      return expect(apiToTest.createNewTeam({})).resolves.toEqual(expectedMockJson);
    });

    it('Fails when unsuccessful', async () => {
      expect.assertions(1);
      return expect(apiToTest.createNewTeam({fail: true})).rejects.toEqual(expectedError);
    });
  });
})