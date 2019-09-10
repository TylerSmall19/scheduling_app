import { isLoggedIn } from './shared/authFilter';
import lambdaConfigManager from './shared/lambdaConfigManager';

exports.handler = async function (event, context, callback) {
  const loggedIn = isLoggedIn(event, context, callback);

  if (loggedIn) {
    return { statusCode: 200, body: JSON.stringify({ msg: 'Welcome!', key: lambdaConfigManager.schedulingApiKey }) };
  }

  console.log('This was invoked illegally');
  throw Error('User not logged in');
}