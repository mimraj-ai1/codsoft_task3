/**
 * Optional API audience. Leave unset in .env until Auth0 → APIs defines the same identifier.
 * Login works without it; backend /sync-user needs a matching API + audience when you enable it.
 */
export function getAuth0ApiAudience() {
  const v = import.meta.env.VITE_AUTH0_AUDIENCE;
  if (v === '' || v === undefined) return undefined;
  return v;
}

export function accessTokenSilentlyOpts() {
  const audience = getAuth0ApiAudience();
  return audience ? { authorizationParams: { audience } } : {};
}
