import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserRole = "agent" | "manager" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  team_id?: string;
  phone?: string;
  office_name?: string;
  created_at: string;
}

// Auth Functions
export const auth = {
  // Sign up agent
  async signupAgent(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    officeName: string,
    phone?: string
  ) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user");

      // Create profile
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert([
          {
            id: authData.user.id,
            email,
            first_name: firstName,
            last_name: lastName,
            role: "agent",
            office_name: officeName,
            phone,
          },
        ]);

      if (profileError) throw profileError;

      return { user: authData.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },

  // Sign up manager
  async signupManager(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    officeName: string,
    phone?: string
  ) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user");

      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert([
          {
            id: authData.user.id,
            email,
            first_name: firstName,
            last_name: lastName,
            role: "manager",
            office_name: officeName,
            phone,
          },
        ]);

      if (profileError) throw profileError;

      return { user: authData.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },

  // Login
  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      return { user: data.user, profile, error: null };
    } catch (error) {
      return { user: null, profile: null, error };
    }
  },

  // Logout
  async logout() {
    return supabase.auth.signOut();
  },

  // Get current session
  async getSession() {
    return supabase.auth.getSession();
  },

  // Get current user with profile
  async getCurrentUser() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) return null;

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", sessionData.session.user.id)
        .single();

      return { user: sessionData.session.user, profile };
    } catch (error) {
      return null;
    }
  },

  // Reset password
  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/reset-password`,
    });
  },

  // Update password
  async updatePassword(newPassword: string) {
    return supabase.auth.updateUser({ password: newPassword });
  },

  // Subscribe to auth state
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
