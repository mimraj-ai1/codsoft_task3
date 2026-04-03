import AuthHostedLoginGate from '../Auth/AuthHostedLoginGate';

/**
 * Auth0 New Universal Login (hosted). Custom form removed so users see the same
 * experience as Auth0’s login/signup page (branding is tuned in the Auth0 Dashboard).
 */
export default function Login() {
  return <AuthHostedLoginGate />;
}
