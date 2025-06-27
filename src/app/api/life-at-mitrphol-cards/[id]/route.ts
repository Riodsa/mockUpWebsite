import { NextRequest, NextResponse } from "next/server";
import { query } from "@/libs/db";

export async function GET(
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id: string = (await params).id;
    const num = parseInt(id, 10);

    if(!id){
      return NextResponse.json(
        { error: "Missing life at mitrphol card ID" },
        { status: 400 }
      );
    }
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json(
        { error: "Invalid life at mitrphol card ID" },
        { status: 400 }
      );
    }
    const result = await query(
      "SELECT * FROM lifeatmitrpholcards WHERE id = $1",
      [num]
    );
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Life at mitrphol card not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch life at mitrphol cards" },
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
        { error: "Missing Life at mitrphol card ID" },
        { status: 400 }
      );
    }
    const num = parseInt(id, 10);
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json(
        { error: "Invalid Life at mitrphol card ID" },
        { status: 400 }
      );
    }

    let sqlQuery = "UPDATE lifeatmitrpholcards SET ";
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
        { error: "Cannot find Life at mitrphol card with id " + num },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Life at mitrphol card updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update Life at mitrphol card" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const num = parseInt(id, 10);

    if (!id) {
      return NextResponse.json(
        { error: "Missing Life at mitrphol card ID" },
        { status: 400 }
      );
    }
    if (isNaN(num) && !Number.isInteger(num)) {
      return NextResponse.json(
        { error: "Invalid Life at mitrphol card ID" },
        { status: 400 }
      );
    }

    const result = await query(
      "DELETE FROM lifeatmitrpholcards WHERE id = $1 RETURNING *",
      [num]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Cannot find Life at mitrphol card with id " + num },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Life at mitrphol card deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete Life at mitrphol card" },
      { status: 500 }
    );
  }
}
