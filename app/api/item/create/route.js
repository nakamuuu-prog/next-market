import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";

// メソッド名はCRUDに対応している
// GET、POST、PUT、DELETEのメソッドを作成すると、それぞれのリクエストに対するレスポンスが返る
export async function POST(repuest) {
  // Thunder ClientのBodyに設定したJSONが表示される
  console.log(await repuest.json());
  connectDB();
  return NextResponse.json({ message: "アイテム作成" });
}
