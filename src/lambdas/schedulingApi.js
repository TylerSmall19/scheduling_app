import { isLoggedIn } from './shared/authFilter';

exports.handler = function (event, context, callback) {
  const loggedIn = isLoggedIn(event, context, callback);

  if (loggedIn) {
    console.log('Legally invoked!', JSON.stringify(context));
    return callback(null, { statusCode: 200, body: 'Welcome!' });
  }

  console.log('This was invoked illegally');
  return callback(Error('User not logged in'));
}