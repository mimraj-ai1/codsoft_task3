// To run this script, you must obtain an Auth0 Management API Token.
// 1. Go to your Auth0 Dashboard -> Applications -> APIs -> Auth0 Management API
// 2. Go to the "API Explorer" tab
// 3. Copy the "Token" from the top.
// 4. Paste it here:
const MANAGEMENT_API_TOKEN = 'YOUR_MANAGEMENT_API_TOKEN_HERE';

// Your Auth0 Domain (from .env or auth_config.json)
const DOMAIN = 'dev-o87pab3dhngt55ct.us.auth0.com'; 

async function updatePrompt(promptName, bodyData) {
    console.log(`Sending request to customize Auth0 Universal Login '${promptName}' prompt...`);
    
    try {
        const response = await fetch(`https://${DOMAIN}/api/v2/prompts/${promptName}/custom-text/en`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MANAGEMENT_API_TOKEN.replace(/\s+/g, '')}`
            },
            body: JSON.stringify(bodyData)
        });

        if (response.ok) {
            console.log(`Success! The ${promptName} prompt text has been updated.`);
        } else {
            console.error(`Failed to update ${promptName}. Status:`, response.status);
            const error = await response.text();
            console.error(error);
        }
    } catch (err) {
        console.error(`Error during request to ${promptName}:`, err);
    }
}

async function updateAllPrompts() {
    if (MANAGEMENT_API_TOKEN === 'YOUR_MANAGEMENT_API_TOKEN_HERE') {
        console.error('\n❌ ERROR: You forgot to replace the API token in the script!');
        console.error('Please open update_auth0_prompt.js and replace YOUR_MANAGEMENT_API_TOKEN_HERE with your actual Auth0 Management API Token.\n');
        process.exit(1);
    }

    // Update login prompt
    await updatePrompt('login', {
        login: {
            title: "Welcome Back!",
            description: "Log in to continue learning"
        }
    });

    // Update signup prompt
    await updatePrompt('signup', {
        signup: {
            title: "Get Started",
            description: "Sign up to continue learning"
        }
    });

    // NOTE: The "Back to OnLearny" link on the Forgot Password page is controlled
    // by the Application Name in Auth0 Dashboard > Applications > [Your App] > Name.
    // Rename your app to "Go Back" there, or accept the default app name behavior.

    // Update consent prompt (Authorization screen message)
    await updatePrompt('consent', {
        consent: {
            messageSingleTenant: 'Sign in to continue learning'
        }
    });
}

updateAllPrompts();
