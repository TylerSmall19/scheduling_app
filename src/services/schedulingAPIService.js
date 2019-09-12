const root = '/.netlify/functions';

const schedulingAPIRoutes = {
  root,
  teamSchedule: (teamID) => root + '/schedulingApi?teamID=' + teamID
}

const authenticatedClient = (identity) => (url, options) =>
  fetch(url, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      ...options.headers,
      'Authorization': 'Bearer ' + (identity.user && identity.user.token.access_token),
    },
    ...options
  });

export class SchedulingAPI {
  constructor (identity) {
    this._client = authenticatedClient(identity);
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