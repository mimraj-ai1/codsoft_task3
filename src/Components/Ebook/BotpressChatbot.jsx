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
        window.botpress.init({
          configUrl: WEBCHAT_CONFIG_URL,
          botId: "f7419460-d96a-4016-b8f9-6329c370b4cf", // Extracted from config
          clientId: "60e5b52d-4cee-42da-8aa4-ffd54747176e", // Extracted from config
          userData: {
            platform: "OnLearny",
            categories: ["Java", "FullStack", "MERN", "DSA", "Database", "WebDev"]
          },
          configuration: {
            botName: "OnLearny Smart Assistant",
            // botDescription: "Your AI Mentor for Courses, Quizzes, and Library search.",
            composerPlaceholder: "Ask me about MERN stack, Java, or DSA...",
          }
        });
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
