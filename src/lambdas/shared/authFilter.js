export const isLoggedIn = (event, context, callback) => {
  console.log("protected function!");
  // Reading the context.clientContext will give us the current user
  const claims = context.clientContext && context.clientContext.user;
  console.log("user claims", claims);

  if (!claims) {
    console.log("User not logged in, or empty claims: ", claims);
    return false;
  }

  return claims;
}