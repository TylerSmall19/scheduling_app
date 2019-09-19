import { IdentityService } from "./identityService";
import { schedulingAPIRoutes } from "../constants/appRoutes";

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
    return this._client(schedulingAPIRoutes.createNewTeam(), {
      method: 'POST',
      body: JSON.stringify(values)
    })
    .then(response => {
      return response.json()
    })
  }
}