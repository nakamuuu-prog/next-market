import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    // useEffectに渡す関数を直接非同期にできないので、中で非同期関数にしておく
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/user/login");
      }

      try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch (error) {
        router.push("/user/login");
      }
    };
    checkToken();
  }, [router]);

  return loginUserEmail;
};

export default useAuth;
