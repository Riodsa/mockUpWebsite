import { NextRequest } from "next/server";
import { login } from "../../../libs/controllers/auth";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  try {
    const user = await login(username ?? '', email ?? '', password);
    
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error : any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}