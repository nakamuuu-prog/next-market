import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);
    // DBのEmailとリクエストのEmailが一致したときだけ編集可能にする(削除も同じ仕組み)
    // => ここってリクエストのEmailじゃなくてLocalStrageにあるトークンから判断するのが正しいのでは？
    // => まだLocalStrageの実装はされていないので、一旦置いとく
    if (singleItem.email === reqBody.email) {
      // updateOneでMongoDBのデータを更新できる
      // findByIdは_idを使うことを前提としているので、updateOneは_idが含まれたオブジェクトにプライマリキーを指定する必要がある
      await ItemModel.updateOne({ _id: context.params.id }, reqBody);
      return NextResponse.json({ message: "アイテム編集成功" });
    }
    return NextResponse.json({ message: "他の人が作成したアイテムです" });
  } catch (error) {
    // idが間違っているとちゃんと失敗する
    return NextResponse.json({ message: "アイテム編集失敗" });
  }
}
