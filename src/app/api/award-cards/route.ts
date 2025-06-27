import { NextRequest, NextResponse } from "next/server";
import { query } from "@/libs/db";

export async function GET() {
  try {
    const result = await query("SELECT * FROM awardcards ORDER BY id ASC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch award cards" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, title_en, body, body_en, image_url, href, is_active } =
      await request.json();

    if (
      !title ||
      !title_en ||
      !body ||
      !body_en ||
      !image_url
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let sqlQuery =
      "INSERT INTO awardcards (title, title_en, body, body_en, image_url ";
    let maxParamCount = 5;
    if (href) {
      sqlQuery += `, href `;
      maxParamCount++;
    }
    if (is_active !== undefined) {
      sqlQuery += `, is_active `;
      maxParamCount++;
    }

    sqlQuery += `) VALUES (`;

    const values: string[] = [];
    for (let i = 1; i <= maxParamCount; i++) {
      if (i > 1) sqlQuery += `, `;
      sqlQuery += `$${i}`;
    }
    sqlQuery += `) RETURNING *`;
    values.push(
      title,
      title_en,
      body,
      body_en,
      image_url
    );
    if (href) {
      values.push(href);
    }
    if (is_active !== undefined) {
      values.push(is_active);
    }

    console.log("QUERIES : " + sqlQuery + " VALUES : " + values);

    const result = await query(sqlQuery, values);

    return NextResponse.json({
      status: 200,
      message: "Award card added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to add award card" },
      { status: 500 }
    );
  }
}
