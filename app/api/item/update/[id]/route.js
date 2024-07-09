import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels.";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();
    // updateOneでMongoDBのデータを更新できる
    // findByIdは_idを使うことを前提としているので、updateOneは_idが含まれたオブジェクトにプライマリキーを指定する必要がある
    await ItemModel.updateOne({ _id: context.params.id }, reqBody);
    return NextResponse.json({ message: "アイテム編集成功" });
  } catch (error) {
    // idが間違っているとちゃんと失敗する
    return NextResponse.json({ message: "アイテム編集失敗" });
  }
}
