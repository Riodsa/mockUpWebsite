import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    throw new Error('Unauthorized');
  }
  if (!process.env.JWT_SECRET) {
    throw new Error('Internal Server Error');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      throw new Error('Invalid token');
    }
  });
  return NextResponse.next();
}
