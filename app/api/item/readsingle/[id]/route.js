import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels.";
import { NextResponse } from "next/server";

// ディレクトリ名を[directoryName]とすることで、URLの末尾を動的に指定することができる(http://localhost:3000/api/item/readsingle/[directoryName])
// 今回はidなのでhttp://localhost:3000/api/item/readsingle/[id]となる
// Next.js 13より前はファイル名を[fileName].jsとすることで動的にしていた
export async function GET(request, context) {
  try {
    await connectDB();
    // contextをターミナルに出力すると{ params: { id: '123' } }という形で出力されるので、URLの末尾に指定したパラメーターはparamsのidで取得できる
    const singleItem = await ItemModel.findById(context.params.id);
    return NextResponse.json({
      message: "アイテム読み取り成功（シングル）",
      singleItem: singleItem,
    });
  } catch (error) {
    return NextResponse.json({ message: "アイテム読み取り失敗（シングル）" });
  }
}
