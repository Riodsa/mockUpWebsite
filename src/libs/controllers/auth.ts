import { query } from "../db"
import fetch from "node-fetch";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

export async function login(username : string, email: string, password: string) {
  try {

    if (!(username || email)) {
      throw new Error('Missing Username or Email');
    }

    if (!password) {
      throw new Error('Missing Password');
    }
    
    const matchingUser = await query('SELECT * FROM users WHERE (user_name = $1 OR email = $2) LIMIT 1', [username, email]);

    if (!matchingUser)  {
      throw new Error('User not found');
    }


    const apiToken = await getAPIMToken();
    if (!apiToken) {
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
      'Authorization': `Bearer ${apiToken}`,
      'Ocp-Apim-Subscription-Key': process.env.Subscription_Key || '',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json() as { code: number; result?: any; message?: string };

    if (data.code !== 200) {
      if (data.message) {
        throw new Error(data.message);
      }
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const jwtToken = jwt.sign({ id: matchingUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const res = { success: true, message: data.message, user: matchingUser.rows[0], token: jwtToken };

    return res;
    
  } catch (error : any) {
    console.error('Authentication error:', error.message);
    throw new Error(error.message);
  }
}

async function getAPIMToken() {
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

export function authMiddleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    throw new Error('Unauthorized');
  }
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new Error('Invalid token');
    }
  });
  return NextResponse.next();
}
