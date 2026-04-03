import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

import { getAuth0ApiAudience } from './auth/accessTokenOptions.js';

const auth0Domain =
  import.meta.env.VITE_AUTH0_DOMAIN || 'dev-5n62t1xjyicrdury.us.auth0.com';
const auth0ClientId =
  import.meta.env.VITE_AUTH0_CLIENT_ID || 'DO7F4sAZNIcJleRQ3phZhLBiXaGdtp3g';

// Do not default an audience: if the API is missing in Auth0, /authorize fails and login breaks.
const auth0Audience = getAuth0ApiAudience();

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
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
)
