import { communicationClient as clientToTest } from "../shared/lambdaOutgoingAPIClient";

describe('Communication Client', () => {
  let mockJsonFunction;
  const fakePayload = {fake: 'bar'};

  beforeEach(() => {
    mockJsonFunction = jest.fn(() => fakePayload);
    spyOn(global, 'fetch').and.callFake(async () => ({ json: mockJsonFunction }));
  });

  it('Exists', () => { 
    expect(clientToTest).toBeDefined()
  });

  it('Calls the underlying http client (fetch)', () => {    
    expect(fetch).not.toBeCalled();
    clientToTest();
    expect(fetch).toBeCalled();
  });

  it('Sets an api_key header', () => {
    clientToTest();
    expect(fetch).toBeCalledWith(
      expect.anything(), 
      expect.objectContaining({ 
        headers: expect.objectContaining({ "api_key": expect.anything()})
      })
    );
  });

  it('Defaults to GET', () => {
    expect(fetch).not.toBeCalled();
    clientToTest();
    expect(fetch).toBeCalledWith(
      expect.anything(), 
      expect.objectContaining({ 
        method: 'GET'
      })
    );
  });

  it('Sets the passed data body', () => {
    const body = { foo: 'bar' };

    expect(fetch).not.toBeCalled();
    clientToTest(undefined, undefined, body);
    expect(fetch).toBeCalledWith(
      expect.anything(), 
      expect.objectContaining({ 
        body: expect.anything()
      })
    );
  });

  it('Runs a JSON.stringify on the object given before setting the body', () => {
    const body = { foo: 'bar' };

    expect(fetch).not.toBeCalled();
    clientToTest(undefined, undefined, body);
    expect(fetch).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        body: JSON.stringify(body)
      })
    );
  });

  it('Doesn\'t set a body if none is given', () => { 
    expect(fetch).not.toBeCalled();
    clientToTest();
    expect(fetch).toBeCalledWith(
      expect.anything(),
      expect.not.objectContaining({
        body: expect.anything()
      })
    );
  });

  it('Sends a request to the given URL', () => { 
    const expectedURL = 'urltest';

    expect(fetch).not.toBeCalled();
    clientToTest(expectedURL);
    expect(fetch).toBeCalledWith(
      expectedURL,
      expect.anything()
    );
  });

  it('Sets the method to the given method', () => { 
    const expectedMethod = 'PUT';

    expect(fetch).not.toBeCalled();
    clientToTest(undefined, expectedMethod);
    expect(fetch).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({ 
        method: expectedMethod
      })
    );
  });

  it('Sets a JSON content-type', () => {
    expect(fetch).not.toBeCalled();
    clientToTest();
    expect(fetch).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: expect.objectContaining({ 'Content-Type': 'application/json'})
      })
    );
  });

  it('Calls .json() on the response', async () => {
    expect.assertions(2);

    expect(mockJsonFunction).not.toBeCalled();
    await clientToTest();
    expect(mockJsonFunction).toBeCalled();
  });

  it('Returns the .json() payload', async () => { 
    expect.assertions(2);

    expect(mockJsonFunction).not.toBeCalled();
    const res = await clientToTest();
    expect(res).toBe(fakePayload);
  });
});