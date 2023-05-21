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

  const authEvent = ref("");
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

  async function resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://moonenergy.netlify.app/?resetPassword=true",
    });
    if (error) {
      console.error(error);
    } else {
    }
    return { data, error };
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

  async function updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    console.log(error);
    return { data, error };
  }

  listenAuthEvent();

  async function listenAuthEvent() {
    supabase.auth.onAuthStateChange((event, session) => {
      authEvent.value = event;
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
    checkUserExist,
    loginWithEmail,
    resetPassword,
    authEvent,
    updatePassword,
  };
});
