import { NextRequest, NextResponse } from "next/server";
import { query } from "@/libs/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id: string = (await params).id;
    const num = parseInt(id, 10);

    if(!id){
      return NextResponse.json(
        { error: "Missing career growth card card ID" },
        { status: 400 }
      );
    }
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json(
        { error: "Invalid career growth card ID" },
        { status: 400 }
      );
    }
    const result = await query(
      "SELECT * FROM careergrowthcards WHERE id = $1",
      [num]
    );
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Career growth card not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch career growth cards" },
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
        { error: "Missing career growth card ID" },
        { status: 400 }
      );
    }
    const num = parseInt(id, 10);
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json(
        { error: "Invalid career growth card ID" },
        { status: 400 }
      );
    }

    let sqlQuery = "UPDATE careergrowthcards SET ";
    let paramCount = 0;
    let value: any[] = [];

    if (title) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `title = $${++paramCount}`;
      value.push(title);
    }
    if (title_en) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `title_en = $${++paramCount}`;
      value.push(title_en);
    }
    if (body) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `body = $${++paramCount}`;
      value.push(body);
    }
    if (body_en) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `body_en = $${++paramCount}`;
      value.push(body_en);
    }
    if (image_url) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `image_url = $${++paramCount}`;
      value.push(image_url);
    }
    if (href) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `href = $${++paramCount}`;
      value.push(href);
    }
    if (is_active !== undefined) {
      if (paramCount !== 0) sqlQuery += `, `;
      sqlQuery += `is_active = $${++paramCount}`;
      value.push(is_active);
    }

    sqlQuery += ` WHERE id = $${++paramCount} RETURNING *`;
    value.push(num);

    // console.log("QUERIES : " + sqlQuery + " VALUES : " + value);

    const result = await query(sqlQuery, value);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Cannot find career growth card with id " + num },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Career growth card updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update career growth card" },
      { status: 500 }
    );
  }
}