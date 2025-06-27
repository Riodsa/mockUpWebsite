import { NextRequest, NextResponse } from "next/server";
import { query } from "@/libs/db";

export async function GET() {
  try {
    const result = await query(
      "SELECT * FROM careergrowthcards ORDER BY id ASC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch career growth cards" },
      { status: 500 }
    );
  }
}