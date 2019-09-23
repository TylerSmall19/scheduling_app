import ConfigManager from './lambdaConfigManager';
import fetch from 'node-fetch';

// const postData('http://example.com/answer', {answer: 42})
// .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
// .catch(error => console.error(error));

export const communicationClient = (url = '', method = 'GET', bodyData = null) => {
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'api_key': ConfigManager.schedulingApiKey
    }
  };

  if (bodyData)
    options.body = JSON.stringify(bodyData)

  return fetch(url, options)
    .then(response => response.json());
}

export const OutgoingAPIClient = {
  async createNewTeam(values) {
    return await communicationClient(ConfigManager.externalAPIRoutes.createTeam(), 'POST', values);
  }
}