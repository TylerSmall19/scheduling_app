describe('Lambda Config', () => {
  describe('schedulingApiKey', () => {
    beforeEach(() => {
      // Using the process.env in tests, so this needs to be reset
      jest.resetModules();
    });

    afterEach(() => { 
      process.env = {};
    });

    it('Has a method called "schedulingApiKey"', () => {
      const service = require('../shared/lambdaConfigManager').default;
      expect(service.schedulingApiKey).toBeDefined()
    });

    it('Gives back the ENV name found from the lookup key', () => {
      process.env 
        .API_LOOKUP_KEY = 'test';
      process.env 
        .test = 'expected';

      const service = require('../shared/lambdaConfigManager').default;
      expect(service.schedulingApiKey).toBe('expected')
    });

    it('Gives back "local" as a key if the env var from lookup isn\'t found', () => { 
      process.env 
      .API_LOOKUP_KEY = 'testingtest';

      const service = require('../shared/lambdaConfigManager').default;
      expect(service.schedulingApiKey).toBe('local')
    });

    it('Gives back "local" as the key if the env is missing completely', () => { 
      const service = require('../shared/lambdaConfigManager').default;
      expect(service.schedulingApiKey).toBe('local')
    });

    it('Gives back "local" as a key if the env var is null isn\'t found', () => { 
      process.env 
      .API_LOOKUP_KEY = null;

      const service = require('../shared/lambdaConfigManager').default;
      expect(service.schedulingApiKey).toBe('local')
    });

    it('Gives back "local" as a key if the env var from lookup is empty', () => { 
      process.env 
        .API_LOOKUP_KEY = 'testingtest';
      process.env 
        .testingtest = '';

      const service = require('../shared/lambdaConfigManager').default;
      expect(service.schedulingApiKey).toBe('local')
    });

    it('Gives back "local" as a key if the env var from lookup is null', () => { 
      process.env 
        .API_LOOKUP_KEY = 'testingtest';
      process.env 
        .testingtest = null;

      const service = require('../shared/lambdaConfigManager').default;
      expect(service.schedulingApiKey).toBe('local')
    });
  });
});