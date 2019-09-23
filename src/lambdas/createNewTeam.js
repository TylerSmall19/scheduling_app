import { isLoggedIn } from './shared/authFilter';
import { OutgoingAPIClient } from './shared/lambdaOutgoingAPIClient';
import { internalError, successResponse } from './shared/responses';

exports.handler = async function (event, context, callback) {
  const loggedIn = isLoggedIn(event, context, callback);

  if (loggedIn) {
    return OutgoingAPIClient.createNewTeam(event.body, context.clientContext.sub)
      .then(res => {
        if (res.status >= 200 && res.status < 300)
          return successResponse(res);
        else
          throw new Error(JSON.stringify(res.exception));
      })
      .catch(ex => {
        console.error(ex);
        return internalError();
      });
  }

  console.log('This was invoked illegally');
  throw Error('User not logged in');
}