import { NextResponse, NextRequest } from "next/server";
import { query } from "@/libs/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id: string = (await params).id;
    const num = parseInt(id, 10);
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const result = await query("SELECT * FROM users WHERE users.id = $1", [
      num,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Cannot find user with id " + num },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
