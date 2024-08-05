import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return NextResponse.json({
      message: "アイテム読み取り成功（オール）",
      allItems: allItems,
    });
  } catch (error) {
    return NextResponse.json({ message: "アイテム読み取り失敗（オール）" });
  }
}

// Next.jsはデフォルトでリクエストのたびにデータを取得しないようになっている
// 毎回データ取得するためのおまじない
export const revalidate = 0;
