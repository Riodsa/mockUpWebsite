import { NextRequest, NextResponse } from "next/server";
import { query } from "@/libs/db";
import { authMiddleware } from "@/libs/controllers/auth";

export async function GET(request: NextRequest) {
    
}