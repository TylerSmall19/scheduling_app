import { isLoggedIn } from './shared/authFilter';

exports.handler = function (event, context, callback) {
  const loggedIn = isLoggedIn(event, context, callback);

  if (loggedIn) {
    console.log('Legally invoked!', JSON.stringify(context));
    return JSON.stringify({ statusCode: 200, body: 'Welcome!' });
  }

  throw new Error();
}