export default defineEventHandler(async (event) => {
  console.log("logout endpoint called");

  // Clear the user's session cookie
  console.log("logout", event.context.user?.email);

  //event.context.cookies.set("session", "", { maxAge: 0, httpOnly: true });

  return { message: "Logged out successfully" };
});
