import { NextRequest, NextResponse } from "next/server";
import { query } from "@/libs/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id: string = (await params).id;
    const num = parseInt(id, 10);
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json(
        { error: "Invalid award card ID" },
        { status: 400 }
      );
    }

    const result = await query("SELECT * FROM awardcards WHERE id = $1", [
      num,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Cannot find award card with id " + num },
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
      { error: "Failed to fetch award cards" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const { title, title_en, body, body_en, image_url, href, is_active } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing award card ID" },
        { status: 400 }
      );
    }
    const num = parseInt(id, 10);
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json(
        { error: "Invalid award card ID" },
        { status: 400 }
      );
    }

    let sqlQuery = "UPDATE awardcards SET ";
    let paramCount = 0;
    const values: string[] = [];

    if (title) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `title = $${++paramCount}`;
      values.push(title);
    }
    if (title_en) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `title_en = $${++paramCount}`;
      values.push(title_en);
    }
    if (body) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `body = $${++paramCount}`;
      values.push(body);
    }
    if (body_en) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `body_en = $${++paramCount}`;
      values.push(body_en);
    }
    if (image_url) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `image_url = $${++paramCount}`;
      values.push(image_url);
    }
    if (href) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `href = $${++paramCount}`;
      values.push(href);
    }
    if (is_active !== undefined) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `is_active = $${++paramCount}`;
      values.push(is_active);
    }

    sqlQuery += ` WHERE id = $${++paramCount} RETURNING *`;
    values.push(num.toString());

    // console.log("QUERIES : " + sqlQuery + " VALUES : " + values);

    const result = await query(sqlQuery, values);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Cannot find award card with id " + num },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Award card updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update award card" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const num = parseInt(id, 10);

    if (!id) {
      return NextResponse.json(
        { error: "Missing award card ID" },
        { status: 400 }
      );
    }
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json(
        { error: "Invalid award card ID" },
        { status: 400 }
      );
    }

    const result = await query(
      "DELETE FROM awardcards WHERE id = $1 RETURNING *",
      [num]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Cannot find award card with id " + num },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Award card deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete award card" },
      { status: 500 }
    );
  }
}
