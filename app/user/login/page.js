// 今回はサーバーコンポーネントとして実装していくので、useStateやユーザー操作のonClickなどが使えない
// クライアントコンポーネントとして機能させるために"use client"と記述することで、それらが使えるようになる
"use client";

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const jsonData = await response.json();
      // stateはリロードすると消えてしまうので、リロードしても情報が消失しないLocal Storageにトークンを保管する
      // Local Strageへの保管は「localStorage.setItem("保管するデータの名前", 保管するデータ);
      // Local Strageへ保管したデータは開発者ツールの[Application] => [Local Strage] => [URL(今回はhttp://localhost:3000)]の「保管するデータの名前」に入っている(今回はtoken)
      localStorage.setItem("token", jsonData.token);
      alert(jsonData.message);
    } catch (error) {
      alert("ログイン失敗");
    }
  };

  return (
    <div>
      <h1 className="page-title">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
