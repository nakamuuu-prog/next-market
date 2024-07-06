import { NextResponse } from "next/server";

// http://localhost:3000/api/helloでアクセスするとJSON形式でオブジェクトが表示される
export async function GET() {
  return NextResponse.json({ message: "こんにちは、さようなら" });
}
