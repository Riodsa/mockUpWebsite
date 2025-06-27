import { NextRequest, NextResponse } from "next/server";
import { query } from "@/libs/db";
import { authMiddleware } from "@/middlewares/auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const type = searchParams.get("type");
    const section = searchParams.get("section");

    let sqlQuery = "SELECT * FROM texts WHERE 1=1";
    const values: string[] = [];
    let paramCount = 0;

    if (page) {
      paramCount++;
      sqlQuery += ` AND page = $${paramCount}`;
      values.push(page);
    }

    if (type) {
      paramCount++;
      sqlQuery += ` AND type = $${paramCount}`;
      values.push(type);
    }

    if (section) {
      paramCount++;
      sqlQuery += ` AND section = $${paramCount}`;
      values.push(section);
    }

    const result = await query(sqlQuery, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          error:
            "Cannot find texts for page " +
            page +
            " and section " +
            section +
            " and type " +
            type,
        },
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
      { error: "Failed to fetch texts" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    authMiddleware(request);
    
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const type = searchParams.get("type");
    const section = searchParams.get("section");
    const { text_en, text } = await request.json();
    console.log("Updated to ", text_en, " and ", text);

    if (!section || !page || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let sqlQuery = "UPDATE Texts SET ";
    let paramCount = 0;
    const values: string[] = [];

    if (text_en) {
      paramCount++;
      sqlQuery += ` text_en = $${paramCount},`;
      values.push(text_en);
    }

    if (text) {
      paramCount++;
      sqlQuery += ` text = $${paramCount},`;
      values.push(text);
    }

    sqlQuery = sqlQuery.slice(0, -1); // Remove trailing comma
    sqlQuery += ` WHERE section = $${++paramCount} AND page = $${++paramCount} AND type = $${++paramCount} RETURNING *`;

    values.push(section, page, type);

    const result = await query(
      sqlQuery,
      values
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Text not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: "Text updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update text" },
      { status: 500 }
    );
  }
}
