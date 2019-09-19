import { isLoggedIn } from './shared/authFilter';

exports.handler = async function (event, context, callback) {
  const loggedIn = isLoggedIn(event, context, callback);

  if (loggedIn) {
    return { statusCode: 200, body: JSON.stringify({ event, context, callback }) };
  }

  console.log('This was invoked illegally');
  throw Error('User not logged in');
}