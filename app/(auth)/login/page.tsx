// pages/login.js
"use client";
import apiClient from "@handler/fetch/client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import useLocaleStore from "@store/useLocaleStore";
import useUserStore from "@store/useUserStore";
import { Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<String | null>(null);
  const router = useRouter();
  const { locale, toggleLocale } = useLocaleStore();
  console.log(locale);
  
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    console.log(value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      // 로그인 요청
      const response = await apiClient.post("/auth/login", {
        userId: email,
        userPassword: password,
      });

      const { loginUserInfo, token } = response.data;
      // Zustand 스토어에 userInfo를 저장
      const setUserInfo = useUserStore.getState().setUserInfo;
      const userInfoWithToken = {
        ...loginUserInfo, // 기존 사용자 정보
        token: token, // 토큰 추가
      };
      setUserInfo(userInfoWithToken);

      // 홈 페이지로 리다이렉트
      router.push(`/${locale}/home`);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("로그인 실패");
      }
    }
  };

  const handleGoogleLogin = () => {
    router.push(
      "https://master-of-prediction.shop:8081/oauth2/authorization/google"
    );
  };

  return (
    <main className="w-full border-x border-slate-200">
      <section className="flex flex-col items-center w-full h-screen md:flex-row">
        <div className="relative hidden h-full bg-green-600 lg:block lg:w-1/2 xl:w-2/3">
          {/* <Image
            src="/images/login-bg.webp"
            alt="Background Image"
            className="object-cover w-full h-full"
            layout="fill" // 또는 width와 height를 지정하기.
          /> */}
          {/* 여기서부터 다른 페이지 */}
          <div className="flex flex-col justify-center w-1/3 p-8 space-y-4 ">
            {/* <Link
              href="/admin"
              className="flex items-center p-2 space-x-2 text-green-300 transition-colors rounded-lg hover:bg-green-500"
            >
              <UserCog size={24} />
              <span>관리자 로그인</span>
            </Link> */}
            <Link
              href={`/${locale}/sales/login`}
              className="flex items-center p-2 space-x-2 text-green-300 transition-colors rounded-lg hover:bg-green-500"
            >
              <Users size={24} />
              <span>영업자 로그인</span>
            </Link>
            {/* <Link
              href="/advertiser"
              className="flex items-center p-2 space-x-2 text-green-300 transition-colors rounded-lg hover:bg-green-500"
            >
              <Megaphone size={24} />
              <span>광고주 로그인</span>
            </Link> */}
          </div>
          {/* 여기까지 다른 페이지 */}
        </div>

        <div className="flex items-center justify-center w-full h-full px-6 bg-white md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
          <div className="w-full max-w-md">
            <Link href={"/"}>
              {/* <Button variant="light" size="lg" className="p-2 font-bold">
                캐시 백{" "}
              </Button> */}
              <p className="mt-4 mb-2 font-bold">리워드</p>
            </Link>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                {/* <label className="block text-gray-700">Email Address</label> */}
                <Input
                  isRequired
                  type="email"
                  label="Email"
                  autoFocus
                  errorMessage="Please enter a valid email"
                  autoComplete="on"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <Input
                  isRequired
                  label="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="mt-2 text-red-500">{error}</p>}
              <div className="mt-2 text-right">
                <Link
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-green-700 focus:text-green-700"
                >
                  비밀번호 찾기
                </Link>
              </div>

              <Button
                type="submit"
                className="block w-full px-4 mt-6 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-400 focus:bg-green-400"
              >
                로그인
              </Button>
            </form>

            <hr className="w-full my-6 border-gray-300" />

            <Button
              type="button"
              className="block w-full px-4 font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:bg-gray-100"
              onClick={handleGoogleLogin}
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use xlinkHref="#a" overflow="visible" />
                  </clipPath>
                  <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>
                <span className="ml-4">Log in with Google</span>
              </div>
            </Button>

            <p className="mt-8">
              회원가입이 안되어 있나요?
              <Link
                href={`/${locale}/signin`}
                className="ml-2 font-semibold text-green-500 hover:text-green-700"
              >
                가입하기
              </Link>
            </p>

            <p className="mt-12 text-sm text-gray-500">
              &copy; 2024 Reward - All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}