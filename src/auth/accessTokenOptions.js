/**
 * Auth token helpers.
 *
 * We use the Auth0 ID token (via getIdTokenClaims) instead of an
 * access token so that no API audience needs to be registered in
 * the Auth0 dashboard.  The backend verifies the ID token using
 * the same JWKS endpoint — it just checks aud === CLIENT_ID.
 */

/**
 * Call this in any component to get the raw ID token JWT string.
 * Usage:
 *   const { getIdTokenClaims } = useAuth0();
 *   const token = await getIdToken(getIdTokenClaims);
 */
export async function getIdToken(getIdTokenClaims) {
  // Pass ignoreCache: true so Auth0 always returns a fresh token,
  // preventing "jwt expired" errors when the cached token has expired.
  const claims = await getIdTokenClaims({ ignoreCache: true });
  if (!claims?.__raw) throw new Error("ID token not available");
  return claims.__raw;
}

// Legacy export kept so old imports don't break at compile time.
export function accessTokenSilentlyOpts() { return {}; }
export function getAuth0ApiAudience() { return undefined; }
