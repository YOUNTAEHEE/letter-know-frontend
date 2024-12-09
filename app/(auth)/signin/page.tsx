// pages/signin.js
"use client";
import apiClient from "@handler/fetch/client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import useLocaleStore from "@store/useLocaleStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  // 이메일 인증 여부 상태 관리
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  // 이메일 상태 관리
  const [email, setEmail] = useState<string | null>("");
  // 인증 코드 상태 관리
  const [verificationCode, setVerificationCode] = useState<string>("");
  const router = useRouter();
  const { locale, toggleLocale } = useLocaleStore();
  const handleGoogleLogin = () => {
    // router.push ("");
  };

  // 성별 옵��
  const genderOptions = [
    { label: "남성", value: "MALE" },
    { label: "여성", value: "FEMALE" },
  ];

  // 폼 제출 이벤트 처리
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      userName: formData.get("userName"),
      userId: formData.get("userId"),
      userPassword: formData.get("password"),
      gender: formData.get("gender"),
      age: formData.get("age"),
      job: formData.get("job"),
      school: formData.get("school"),
      location: formData.get("location"),
      hobbies: formData.get("hobbies"),
      introduction: formData.get("introduction"),
    };
    console.log(data); // 전송할 데이터를 출력
    try {
      // 백엔드 API 호출
      const response = await apiClient.post("/api/v1/user/join", data);
      router.push(`/${locale}/login`);
    } catch (error) {}
  };

  const handleEmailSend = async () => {
    if (!email || email.trim() === "") {
      alert("이메일을 입력해 주세요.");
      return;
    }
    try {
      const response = await apiClient.post("/api/v1/email/send", {
        email: email,
      });
    } catch (error) {}
  };

  const handleCodeVerification = async () => {
    try {
      const response = await apiClient.post("/api/v1/email/verify", {
        email: email,
        verifyCode: verificationCode,
      });
      if (response.data === "인증이 완료되었습니다.") {
        setIsEmailVerified(true);
      }
    } catch (error) {}
  };

  return (
    <main className="w-full border-x border-slate-200">
      <section className="flex flex-col items-center w-full h-auto bg-green-600 md:flex-row">
        <div className="relative hidden h-full bg-green-600 lg:block lg:w-1/2 xl:w-2/3">
          {/* <Image
            src="/images/login-bg.webp"
            alt="Background Image"
            className="object-cover w-full h-full"
            layout="fill" // 또는 width와 height를 지정하세요.
          /> */}
        </div>

        <div className="flex items-center justify-center w-full h-full px-6 bg-white md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
          <div className="w-full max-w-md">
            <Link href={"/"}>
              {/* <Button variant="light" size="lg" className="mt-2 mb-2 font-bold">캐시 백</Button> */}
              <p className="mt-4 mb-2 font-bold">리워드</p>
            </Link>
            <form className="mt-6" onSubmit={handleSubmit}>
              {/* 이름 */}
              <Input
                name="userName"
                isRequired
                type="text"
                label="이름"
                autoFocus
                variant="bordered"
                className="mb-4"
              />

              {/* Email Address Field */}
              <div className="inline-flex w-full mt-4">
                <Input
                  name="userId"
                  isRequired
                  type="email"
                  label="이메일"
                  autoComplete="on"
                  required
                  className="w-2/3"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="button"
                  className="w-1/3 h-auto px-4 py-3 ml-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-400 focus:bg-green-400"
                  onClick={handleEmailSend}
                >
                  발송
                </Button>
              </div>

              {/* Verification Code Field */}
              <div className="inline-flex w-full mt-4">
                <Input
                  type="string"
                  label="인증번호"
                  autoComplete="on"
                  variant="bordered"
                  // required
                  // isRequired
                  className="w-2/3"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <Button
                  type="button"
                  className="w-1/3 h-auto px-4 py-3 ml-3 font-semibold text-black rounded-lg hover:bg-gray-400"
                  onClick={handleCodeVerification}
                >
                  인증확인
                </Button>
              </div>

              {/* 비밀번호 */}
              <Input
                name="password"
                isRequired
                label="비밀번호"
                type="password"
                variant="bordered"
                className="mb-4"
              />

              {/* 성별 */}
              <Select name="gender" label="성별" className="mb-4" isRequired>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              {/* 나이 */}
              <Input
                name="age"
                type="number"
                label="나이"
                variant="bordered"
                className="mb-4"
                isRequired
              />

              {/* 직업 */}
              <Input
                name="job"
                type="text"
                label="직업"
                variant="bordered"
                className="mb-4"
                placeholder="현재 직업을 입력해주세요"
                isRequired
              />

              {/* 학교 */}
              <Input
                name="school"
                type="text"
                label="졸업 학교명"
                variant="bordered"
                className="mb-4"
              />

              {/* 거주지 */}
              <Input
                name="location"
                type="text"
                label="사는 곳"
                variant="bordered"
                className="mb-4"
                isRequired
              />

              {/* 취미 */}
              <Input
                name="hobbies"
                type="text"
                label="취미"
                variant="bordered"
                className="mb-4"
              />

              {/* 자기소개 */}
              <Input
                name="introduction"
                type="text"
                label="자기소개"
                variant="bordered"
                className="mb-4"
                placeholder="간단한 자기소개를 입력해주세요"
              />

              {/* 가입하기 버튼 */}
              <Button
                type="submit"
                className="w-full px-4 mt-6 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-400 focus:bg-green-400"
              >
                가입하기
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
                <span className="ml-4">Sign up with Google</span>
              </div>
            </Button>

            <p className="mt-8">
              이미 가입되어 있나요?
              <Link
                href={`/${locale}/login`}
                className="ml-2 font-semibold text-green-500 hover:text-green-700"
              >
                로그인하기
              </Link>
            </p>

            <p className="mt-12 mb-4 text-sm text-gray-500">
              &copy; 2024 Reward - All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
