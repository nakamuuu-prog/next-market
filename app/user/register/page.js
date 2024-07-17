"use client";

import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // バックエンドから値が返ってくる前にJSONに変換しないよう非同期にしておく
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // データの送信にはfetchを使う
      // responseにはバックエンドから返ってきたNextResponseの値が入る
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      // バックエンドから返された値はストリームという特殊な形式なので、JSONに変換
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert("ユーザー登録失敗");
    }
  };
  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="名前"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="メールアドレス"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="パスワード"
        />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
