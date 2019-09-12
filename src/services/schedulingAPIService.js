import { IdentityService } from "./identityService";

const root = '/.netlify/functions';

const schedulingAPIRoutes = {
  root,
  teamSchedule: (teamID) => root + '/schedulingApi?teamID=' + teamID,
  createNewTeam: root + '/teams'
}

const _authenticatedClient = (token) => (url, options) => {
  return fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      ...options.headers,
      'Authorization': 'Bearer ' + token.access_token,
    }
  });
}

export class SchedulingAPI {
  constructor (client) {
    // Lets our tests inject the client, or make a new one
    this._client = client || _authenticatedClient(IdentityService.getToken());
  }

  async getTeamSchedule(teamID) {
    return await this._client(schedulingAPIRoutes.teamSchedule(teamID), {
      method: 'GET'
    })
    .then(response => {
      return response.json()
    })
  }

  async createNewTeam(values) {
    console.log('Creating a new team');
  }
}