import React, { useEffect } from 'react';

/** Full URL to your Botpress webchat config.js (from Botpress dashboard). */
const WEBCHAT_CONFIG_URL = import.meta.env.VITE_BOTPRESS_WEBCHAT_CONFIG_URL;

const BotpressChatbot = () => {
  useEffect(() => {
    if (!WEBCHAT_CONFIG_URL) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2/inject.js';
    script.async = true;
    
    script.onload = () => {
      if (window.botpress) {
        window.botpress.init({
          configUrl: WEBCHAT_CONFIG_URL,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script
      document.body.removeChild(script);
      
      // Attempt to cleanup the chat window if the library supports it
      if (window.botpress && typeof window.botpress.destroy === 'function') {
        window.botpress.destroy();
      }
    };
  }, []);

  if (!WEBCHAT_CONFIG_URL) return null;

  return null; // v2 handles its own injection and doesn't strictly need a dedicated container div anymore
};

export default BotpressChatbot;
