import { Auth0Provider } from '@auth0/auth0-react';
import App from '../../App.jsx';
import { getAuth0ApiAudience } from '../../auth/accessTokenOptions.js';

/**
 * Renders Auth0 only when VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID are set.
 * Keeps tenant credentials out of the repo (use .env locally and in Vercel).
 */
export default function Auth0EnvRoot() {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN?.trim();
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID?.trim();
  const auth0Audience = getAuth0ApiAudience();

  const authorizationParams = {
    redirect_uri: window.location.origin,
    ...(auth0Audience ? { audience: auth0Audience } : {}),
  };

  if (!domain || !clientId) {
    return (
      <div
        style={{
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          maxWidth: 560,
          margin: '2rem auto',
        }}
      >
        <h1 style={{ fontSize: '1.25rem' }}>Auth0 is not configured</h1>
        <p>
          Copy <code>.env.example</code> to <code>.env</code> in the project root
          and set <code>VITE_AUTH0_DOMAIN</code> and{' '}
          <code>VITE_AUTH0_CLIENT_ID</code>. Restart the dev server after
          changing <code>.env</code>.
        </p>
        <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
          On Vercel, add the same variables under Project → Settings →
          Environment Variables.
        </p>
      </div>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={authorizationParams}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  );
}
