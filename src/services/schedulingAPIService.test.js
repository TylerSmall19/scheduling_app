import { SchedulingAPI } from "./schedulingAPIService";

describe('Scheduling API Service', () => { 
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
  });
})