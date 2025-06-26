import { NextResponse, NextRequest } from "next/server";
import {query} from "@/libs/db"
import { authMiddleware } from "@/middlewares/auth";

export async function GET(request: NextRequest) {
  try {
    const result = await query("SELECT * FROM information_schema.tables WHERE table_schema = 'public'");

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tables" },
      { status: 500 }
    );
  }
}
