import { NextRequest, NextResponse } from "next/server";
import { query } from "@/libs/db";
import { authMiddleware } from "@/middlewares/auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const section = searchParams.get("section");

    let sqlQuery = "SELECT * FROM images WHERE 1=1";
    const values: string[] = [];
    let paramCount = 0;

    if (page) {
      paramCount++;
      sqlQuery += ` AND page = $${paramCount}`;
      values.push(page);
    }

    if (section) {
      paramCount++;
      sqlQuery += ` AND section = $${paramCount}`;
      values.push(section);
    }

    sqlQuery += " ORDER BY id ASC";

    // Fetch the image from your database or storage
    const result = await query(sqlQuery, values);

    if (!result) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response("Error fetching image", { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    authMiddleware(request);
    
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const section = searchParams.get("section");
    const { image_url } = await request.json();

    if (!page || !section || !image_url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sqlQuery = `
      UPDATE Images
      SET image_url = $1
      WHERE page = $2 AND section = $3
      RETURNING *
    `;
    const values = [image_url, page, section];
    const result = await query(sqlQuery, values);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: "Image updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response("Error uploading image", { status: 500 });
  }
}
