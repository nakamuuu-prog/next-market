"use client";

import { useState } from "react";

const Register = () => {
  // 参考：stateはまとめて書くこともできる
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // stateをまとめる場合はスプレッド構文を使ってデータをセットする
  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

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
        // stateはすべてnewUserに入っているので、fetchのbodyはnewUserを渡すだけでOK
        // body: JSON.stringify({
        //   name: name,
        //   email: email,
        //   password: password,
        // }),
        body: JSON.stringify(newUser),
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
          // まとめたstateはオブジェクトと同じように値を取得する
          // value={name}
          value={newUser.name}
          // onChange={(e) => setName(e.target.value)}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="名前"
        />
        <input
          // value={email}
          value={newUser.email}
          // onChange={(e) => setEmail(e.target.value)}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="メールアドレス"
        />
        <input
          value={newUser.password}
          // onChange={(e) => setPassword(e.target.value)}
          onChange={handleChange}
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
