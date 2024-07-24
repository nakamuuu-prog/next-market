"use client";
import useAuth from "@/app/utils/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const DeleteItem = (context) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const loginUserEmail = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getSingleItem = async (id) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
        { cache: "no-store" }
      );
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;

      setTitle(singleItem.title);
      setPrice(singleItem.price);
      setImage(singleItem.image);
      setDescription(singleItem.description);
      setEmail(singleItem.email);
    };
    getSingleItem(context.params.id);
  }, [context]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            price: price,
            image: image,
            description: description,
            email: loginUserEmail,
          }),
        }
      );

      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch (error) {
      alert(error);
      alert("アイテム削除失敗");
    }
  };

  if (loginUserEmail === email) {
    return (
      <div>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <Image
            src={image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <h3>¥{price}</h3>
          <p>{description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;
