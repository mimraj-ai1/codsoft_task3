import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

const auth0Domain =
  import.meta.env.VITE_AUTH0_DOMAIN || 'dev-5n62t1xjyicrdury.us.auth0.com';
const auth0ClientId =
  import.meta.env.VITE_AUTH0_CLIENT_ID || 'DO7F4sAZNIcJleRQ3phZhLBiXaGdtp3g';
// Backend (authMiddleware) expects this audience unless you change both sides.
// In Auth0: APIs → Create API → Identifier = this value, then authorize your SPA app.
const rawAudience = import.meta.env.VITE_AUTH0_AUDIENCE;
const auth0Audience =
  rawAudience === '' ? undefined : rawAudience || 'https://onlearny-api.com';

const authorizationParams = {
  redirect_uri: window.location.origin,
  ...(auth0Audience ? { audience: auth0Audience } : {}),
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={authorizationParams}
    >
      <App />
    </Auth0Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
)
