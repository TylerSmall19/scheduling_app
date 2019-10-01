import { isLoggedIn } from './shared/authFilter';
import { OutgoingAPIClient } from './shared/lambdaOutgoingAPIClient';
import { internalError, successResponse } from './shared/responses';

exports.handler = async function (event, context, callback) {
  const loggedIn = isLoggedIn(event, context, callback);

  if (loggedIn) {
    return OutgoingAPIClient.getTeamByID(event && event.queryStringParameters.teamID)
      .then(res => {
        if (res)
          return successResponse(res);
        else
          throw new Error('Response not 200', JSON.stringify(res));
      })
      .catch(ex => {
        console.error(ex);
        return internalError();
      });
  }

  console.log('TeamByID was invoked illegally');
  throw Error('User not logged in');
}