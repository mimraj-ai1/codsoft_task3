import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Auth0Provider
      domain="dev-o87pab3dhngt55ct.us.auth0.com"
      clientId="pAqkqTfjGLYarZl6lcnHOddMOaDvSoTF"  // Confirm this Client ID is still correct!
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://onlearny-api.com"
      }}
    >
      <App />
    </Auth0Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
)
