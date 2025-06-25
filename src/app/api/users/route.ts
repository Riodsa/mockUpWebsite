import { NextResponse } from "next/server";
import {query} from "@/libs/db"

export async function GET(request: Request) {
  try {
    const result = await query("SELECT * FROM users ORDER BY id ASC");

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
