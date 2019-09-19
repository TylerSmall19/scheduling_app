export const appRoutes = {
  home: () => '/',
  newTeam: () => '/teams/new',
  teamPage: (id) => `/teams/${id}`
}

const schedApiBase = '/.netlify/functions';
export const schedulingAPIRoutes = {
  root: () => schedApiBase,
  teamSchedule: (teamID) => schedApiBase + '/schedulingApi?teamID=' + teamID,
  createNewTeam: () => schedApiBase + '/createNewTeam'
}