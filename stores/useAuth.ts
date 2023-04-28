import { defineStore } from "pinia";
import { useHomeVideos } from "./useHomeVideos";
import { useUserVideos } from "./useUserVideos";
import { usePayment } from "./usePayment";

export const useAuth = defineStore("useAuth", () => {
  const { showPayment, setShowPayment, amount, setAmount } = usePayment();
  const { refetch } = useHomeVideos();

  const { refetchUserVideos } = useUserVideos();
  const loading = markRaw(ref(false));
  const supabase = useSupabaseAuthClient();
  const supabaseClient = useSupabaseClient();
  const user = computed(() => {
    const userSupa = useSupabaseUser();
    return userSupa.value;
  });

  watchEffect(async () => {
    if (user.value) {
      loading.value = false;
    }
  });

  /*

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      loading.value = true;
    } else {
    }
  });
  */

  async function login() {
    const redirectTo = `${window.location.origin}`;

    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo },
    });
    if (error) {
      console.error(error);
    } else {
    }
  }

  async function loginWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
      return { success: false, error };
    } else {
      //setShowPayment(true);
      loading.value = true;
      return { success: true, data };
    }
  }

  async function registerUser(dataObj: any): Promise<any> {
    console.log(dataObj);
    const { data, error } = await supabase.auth.signUp({
      email: dataObj.email,
      password: dataObj.password,
    });

    let authError = null;

    // User exists, but is fake. See https://supabase.com/docs/reference/javascript/auth-signup
    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      authError = {
        name: "AuthApiError",
        message: "User already exists",
      };
    } else if (error)
      authError = {
        name: error.name,
        message: error.message,
      };

    return { auth: data, error: authError };
  }

  async function listenVerifiedEmail() {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        // Check if the user's email has been verified
        const { app_metadata } = session.user;
        if (app_metadata && app_metadata.email_verified) {
          // The user has verified their email, so redirect them to a new page
          console.log("Email verified, redirecting to dashboard...");
        } else {
          console.log("Please verify your email to access the dashboard.");
        }
      }
    });
  }

  async function checkUserExist(email: string): Promise<any> {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: "123456",
    });

    // User exists, but is fake. See https://supabase.com/docs/reference/javascript/auth-signup
    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      console.log("user exists");
      return true;
    } else if (error) {
      console.log("user does not exist");
      return false;
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    } else {
    }
    try {
      await $fetch("api/_supabase/session", {
        method: "POST",
        body: { event: "SIGNED_OUT", session: null },
      });
    } catch (error) {
      console.log(error);
    }
    try {
      await $fetch("api/user/logout", {
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }
    refetch();
    refetchUserVideos();
    await navigateTo("/");
    loading.value = false;
  }

  return {
    user,
    login,
    logout,
    loading,
    registerUser,
    listenVerifiedEmail,
    checkUserExist,
    loginWithEmail,
  };
});
