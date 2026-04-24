import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getIdToken } from "../../auth/accessTokenOptions.js";

export default function UserSync() {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const syncUserToDatabase = async () => {
      if (isAuthenticated && user) {
        try {
          // Get the secure token for the backend API
          const token = await getIdToken(getIdTokenClaims);

          // Hit the sync endpoint with email and name
          const apiBase =
            import.meta.env.VITE_API_URL || "http://localhost:3000";
          await axios.post(
            `${apiBase.replace(/\/$/, "")}/sync-user`,
            {
              email: user.email,
              name: user.name || user.nickname,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("User synced successfully with the database.");
        } catch (error) {
          const status = error.response?.status;
          const message = error.response?.data?.message || error.message;
          console.error(`Failed to sync user (${status}):`, message);
          
          if (status === 401) {
            console.warn("Hint: Check if VITE_AUTH0_AUDIENCE is set in .env and matches backend.");
          }
        }
      }
    };

    syncUserToDatabase();
  }, [isAuthenticated, user, getIdTokenClaims]);

  return null; // This component runs silently in the background
}
