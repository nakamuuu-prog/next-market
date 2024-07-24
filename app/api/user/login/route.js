import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels.";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });
    if (savedUserData) {
      if (reqBody.password === savedUserData.password) {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const payload = {
          email: reqBody.email,
        };
        // ペイロード(payload)とシークレットキー(secret key)を組み合わせて、SignJWTで文字と数字がランダムに並んだ文字列のトークンを発行する
        // (余談)Next.jsではNextAuthというパッケージがよく使われる。ここではJSON Web Token(JWT)を使う
        // 発行されたトークンの内容は https://jwt.io/ に発行されたトークンを入力すると確認可能
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(secretKey);
        // 通常は発行されたトークンはフロントエンド側のLocal Strageに保存する
        // 開発者ツールの[Application]=>[Local strage]で確認可能
        return NextResponse.json({ message: "ログイン成功", token: token });
      } else {
        return NextResponse.json({
          message: "ログイン失敗：パスワードが間違っています",
        });
      }
    }
    return NextResponse.json({
      message: "ログイン失敗：ユーザー登録をしてください",
    });
  } catch (error) {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}
