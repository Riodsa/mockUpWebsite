import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/libs/db";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const credentials = Buffer.from(authHeader.split(" ")[1], 'base64').toString('ascii');
    const [username, password] = credentials ? credentials.split(":") : [];

    if (!username || !password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const matchingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const isValid = await pool.query(
      'SELECT verify_password($1, $2) AS valid',
      [password, matchingUser.rows[0].password]
    );

    if (!isValid.rows[0].valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const token = jwt.sign({ id: matchingUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const user = {
      id: matchingUser.rows[0].id,
      name: matchingUser.rows[0].name,
      token: token
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error : any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}