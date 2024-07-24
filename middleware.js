import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// middleware.jsはすべてのやりとり(request、response)の際に必ず経由される
// => ファイル名はmiddleware2.jsにすると機能しなくなった
export async function middleware(request) {
  // headerのlocal strageからトークンを取得する
  const token = await request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }
  try {
    const secretKey = new TextEncoder().encode("next-market-app-book");
    // jwtVerifyを使ってトークンの判定を行う
    // 不正なトークンであったり、有効期限が過ぎている場合はエラーになる
    const decodedJwt = await jwtVerify(token, secretKey);
    // console.log("decodedJwt:", decodedJwt);
    // 結果
    // decodedJwt: {
    //   payload: { email: 'dummy@gmail.com', exp: 1720742732 },
    //   protectedHeader: { alg: 'HS256' }
    // }

    // NextResponse.nextはこのファイルの処理が問題なく完了したことを告げるコード
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({
      message: "トークンが正しくないので、ログインしてください",
    });
  }
}

// configを宣言し、matcherの配列に指定のパスを入れることで、middlewareを経由したい機能を制限できる
// updateやdeleteはidによってパスが異なるため、「:path*」とすることで動的なパスに対応できる
export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};
