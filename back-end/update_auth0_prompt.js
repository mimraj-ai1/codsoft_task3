// To run this script, you must obtain an Auth0 Management API Token.
// 1. Go to your Auth0 Dashboard -> Applications -> APIs -> Auth0 Management API
// 2. Go to the "API Explorer" tab
// 3. Copy the "Token" from the top.
// 4. Paste it here:
const MANAGEMENT_API_TOKEN = 'YOUR_MANAGEMENT_API_TOKEN_HERE';

// Your Auth0 Domain (from .env or auth_config.json)
const DOMAIN = 'dev-5n62t1xjyicrdury.us.auth0.com'; 

async function updateLoginPrompt() {
    if (MANAGEMENT_API_TOKEN === 'YOUR_MANAGEMENT_API_TOKEN_HERE') {
        console.error('\n❌ ERROR: You forgot to replace the API token in the script!');
        console.error('Please open update_auth0_prompt.js and replace YOUR_MANAGEMENT_API_TOKEN_HERE with your actual Auth0 Management API Token.\n');
        process.exit(1);
    }
    
    console.log('Sending request to customize Auth0 Universal Login prompt...');
    
    try {
        const response = await fetch(`https://${DOMAIN}/api/v2/prompts/login/custom-text/en`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MANAGEMENT_API_TOKEN}`
            },
            body: JSON.stringify({
                login: {
                    title: "Welcome to OnLearny",
                    description: "Sign up to continue learning."
                }
            })
        });

        if (response.ok) {
            console.log('Success! The login prompt text has been updated.');
        } else {
            console.error('Failed to update. Status:', response.status);
            const error = await response.text();
            console.error(error);
        }
    } catch (err) {
        console.error('Error during request:', err);
    }
}

updateLoginPrompt();
