import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function UserSync() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const syncUserToDatabase = async () => {
      if (isAuthenticated && user) {
        try {
          // Get the secure token for the backend API
          const token = await getAccessTokenSilently();

          // Hit the sync endpoint with email and name
          await axios.post(
            "http://localhost:4110/sync-user",
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
          console.error("Failed to sync user to database:", error);
        }
      }
    };

    syncUserToDatabase();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return null; // This component runs silently in the background
}
