import React, { useEffect } from 'react';

/** Full URL to your Botpress webchat config.js (from Botpress dashboard). */
const WEBCHAT_CONFIG_URL = import.meta.env.VITE_BOTPRESS_WEBCHAT_CONFIG_URL;

const BotpressChatbot = () => {
  useEffect(() => {
    if (!WEBCHAT_CONFIG_URL) return;

    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = WEBCHAT_CONFIG_URL;
    script2.defer = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  if (!WEBCHAT_CONFIG_URL) return null;

  return <div id="webchat"/>;
};

export default BotpressChatbot;
