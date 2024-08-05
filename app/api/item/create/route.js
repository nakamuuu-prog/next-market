import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

// メソッド名はCRUDに対応している
// GET、POST、PUT、DELETEのメソッドを作成すると、それぞれのリクエストに対するレスポンスが返る
export async function POST(repuest) {
  const reqBody = await repuest.json();

  try {
    await connectDB();
    await ItemModel.create(reqBody);
    return NextResponse.json({ message: "アイテム作成成功" });
  } catch (error) {
    return NextResponse.json({ message: "アイテム作成失敗" });
  }
}
