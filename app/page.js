// Next.jsが用意している専用のタグ
// それぞれ<img>と<a>の高機能版
import Link from "next/link";
// Imageタグは画像の最適化を自動で行ってくれる
import Image from "next/image";

const getAllItems = async () => {
  // fetchはGETリクエストがデフォルトなので、methodは不要
  // headersやbodyも値の取得のみなので不要
  // => なぜか繰り返し何度もリクエストが飛ぶことがある
  const response = await fetch("http://localhost:3000/api/item/readall", {
    // Next.jsは取得したデータをキャッシュとして保存することで、データ取得のリクエスト回数を抑えて表示速度を上げている
    // そのため、データを更新しても直ちに反映されないことがあるので、キャッシュを保存しないように設定する
    cache: "no-store",
  });
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  return allItems;
};

// 「async/awaitはクライアント・コンポーネントではまだサポートされていません」というエラーが起こる
// Error: async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.
const ReadAllItems = async () => {
  const allItems = await getAllItems();
  return (
    <div>
      {/* 配列の中にアイテムが1つ1つオブジェクトとして入っているので取り出す */}
      {allItems.map((item) => (
        // 「Warning: Each child in a list should have a unique "key" prop.」というエラーを回避するために、1つ1つのデータにkeyを設定する必要がある
        <Link href="" key={item._id}>
          {/* Imageは必ずheightとwidthを指定しなければいけない */}
          <Image
            src={item.image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <div>
            <h2>¥{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ReadAllItems;
