// This is set in the netlify console in a similar way to the API Keys
const root = process.env.SCHEDULING_API_ROOT || 'localhost:3001';

export default {
  schedulingApiKey: process.env[process.env.API_LOOKUP_KEY] || 'local',
  externalAPIRoutes: {
    root,
    createTeam: () => root + '/teams'
  }
}