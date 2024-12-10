import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "GET 요청 성공!" });
}

export async function POST(request: Request) {
  const body = await request.json(); // POST 데이터 파싱
  return NextResponse.json({ message: "POST 요청 성공!", data: body });
}
