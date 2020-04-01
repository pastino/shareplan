export const isAuthenticated = request => {
  if (!request.user) {
    console.log("You have to login");
  } else {
    return;
  }
};
