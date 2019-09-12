import { SchedulingAPI } from "./schedulingAPIService";
import { IdentityService } from "./identityService";

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
})