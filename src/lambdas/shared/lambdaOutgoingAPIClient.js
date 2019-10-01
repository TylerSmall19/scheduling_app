import ConfigManager from './lambdaConfigManager';
import fetch from 'node-fetch';

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
  async createNewTeam(values, captainId) {
    values.captainId = captainId;

    return await communicationClient(ConfigManager.externalAPIRoutes.createTeam(), 'POST', values);
  },

  async getTeamByID(teamID) {
    
  }
}