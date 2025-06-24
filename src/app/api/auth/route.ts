import { NextRequest,NextResponse } from "next/server";
import { login } from "../../../libs/controllers/auth";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  try {
    const user = await login(username ?? '', email ?? '', password);
    
    return NextResponse.json(user, { status: 200 });
  } catch (error : any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}