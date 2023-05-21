export default defineEventHandler(async (event) => {
  // Clear the user's session cookie

  //event.context.cookies.set("session", "", { maxAge: 0, httpOnly: true });

  return { message: "Logged out successfully" };
});
