import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './AuthHostedLoginGate.css';

/**
 * Sends the user to Auth0 New Universal Login (hosted page).
 * Shows a short full-screen layout similar to Auth0 while the redirect runs.
 */
export default function AuthHostedLoginGate({ screenHint }) {
  const { loginWithRedirect, isLoading, error } = useAuth0();
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (isLoading || error) return;
    const opts =
      screenHint === 'signup'
        ? { authorizationParams: { screen_hint: 'signup' } }
        : {};
    (async () => {
      try {
        await loginWithRedirect(opts);
      } catch (e) {
        setLocalError(e?.message || String(e));
      }
    })();
  }, [isLoading, error, loginWithRedirect, screenHint]);

  const message = error?.message || localError;

  return (
    <div className="auth-hosted-gate" role="status" aria-live="polite">
      <div className="auth-hosted-gate__card">
        <div className="auth-hosted-gate__logo" aria-hidden="true">
          <i className="fa fa-graduation-cap" />
        </div>
        <h1 className="auth-hosted-gate__title">Welcome</h1>
        {message ? (
          <>
            <p className="auth-hosted-gate__subtitle auth-hosted-gate__subtitle--error">
              {message}
            </p>
            <p className="auth-hosted-gate__hint small text-muted">
              Check Auth0 → Application → Allowed Callback / Logout / Web Origins
              include <code>{window.location.origin}</code> (use the same host as
              the address bar, e.g. localhost vs 127.0.0.1). If you set{' '}
              <code>VITE_AUTH0_AUDIENCE</code>, the API must exist in Auth0 → APIs.
            </p>
            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={() => {
                setLocalError(null);
                window.location.reload();
              }}
            >
              Retry
            </button>
          </>
        ) : (
          <>
            <p className="auth-hosted-gate__subtitle">
              Redirecting to OnLearny sign in…
            </p>
            <div className="auth-hosted-gate__spinner" aria-label="Loading">
              <span className="auth-hosted-gate__spinner-dot" />
              <span className="auth-hosted-gate__spinner-dot" />
              <span className="auth-hosted-gate__spinner-dot" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
