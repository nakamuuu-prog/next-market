// 今回はサーバーコンポーネントとして実装していくので、useStateやユーザー操作のonClickなどが使えない
// クライアントコンポーネントとして機能させるために"use client"と記述することで、それらが使えるようになる
"use client";

const ReadAllItems = () => {
  return (
    <div>
      <h1 className="h1-style">こんにちは</h1>
      <h3>さようなら</h3>
    </div>
  );
};

export default ReadAllItems;
