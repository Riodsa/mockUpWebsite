import pool from "../db";
import fetch from "node-fetch";

export async function login(username : string, email: string, password: string) {
  try {

    if (!(username || email)) {
      throw new Error('Missing Username or Email');
    }

    if (!password) {
      throw new Error('Missing Password');
    }

    const matchingUser = await pool.query('SELECT * FROM users WHERE (user_name = $1 OR email = $2) LIMIT 1', [username, email]);

    if (!matchingUser)  {
      throw new Error('User not found');
    }

    const token = await getAPIMToken();
    if (!token) {
      throw new Error('Failed to retrieve API token');
    }

    const requestBody: { username?: string; email?: string; password: string } = { password };
    if (username) {
      requestBody.username = username;
    } else if (email) {
      requestBody.email = email;
    }

    const response = await fetch(`https://${process.env.service_host}/userinfo/api/v2/authen/profile`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Ocp-Apim-Subscription-Key': process.env.Subscription_Key || '',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json() as { code: number; result?: any; message?: string };

    if (data.code === 200) {
      
      const res = { success: true, message: data.message, user: matchingUser.rows[0] };

      return res;
    }
  } catch (error : any) {
    // console.error('Authentication error:', error.message);
    throw new Error(error.message);
  }
}

export async function getAPIMToken() {
  try {
    const response = await fetch(`https://login.microsoftonline.com/${process.env.Tenant_ID}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.Client_ID || '',
        client_secret: process.env.Client_Secret || '',
        scope: process.env.Scope || '',
      }),
    }).then(response => response.json());

    const data = response as { access_token: string };

    return data.access_token;
  } catch (error : any) {
    console.error('Token retrieval error:', error);
    throw new Error('Token retrieval failed');
  }
}