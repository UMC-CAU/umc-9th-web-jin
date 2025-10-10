import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z
    .object({
        email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
        password: z
        .string()
        .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
        .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
        passwordCheck: z
        .string()
        .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
        .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
        name: z.string().min(1, { message: "이름을 입력해주세요." }),
    })
    .refine((data) => data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordCheck"],
    });

    type FormFields = z.infer<typeof schema>;

    const SignupPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2>(1); // 단계 관리
    const [nickname, setNickname] = useState(""); // 닉네임 입력 상태
    const [signupResult, setSignupResult] = useState<string | null>(null); // 결과 메시지

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
        email: "",
        password: "",
        passwordCheck: "",
        name: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    });


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordCheck, ...rest } = data;
        try {
        const response = await postSignup(rest);
        setSignupResult("회원가입 성공!");
        
        console.log("회원가입 성공:", response);
        setStep(2);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
        const msg = err.response?.data?.message || "회원가입 실패";
        setSignupResult(msg);
        console.error("회원가입 실패:", err);
        }
    };

    const handleNicknameSubmit = () => {
        if (!nickname.trim()) return alert("닉네임을 입력해주세요!");
        console.log("닉네임 등록:", nickname);
        
        navigate("/login"); 
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
        {step === 1 ? (
            // 회원가입
            <div className="flex flex-col gap-3">
            <input
                {...register("email")}
                className={`border w-[300px] p-[10px] rounded-sm ${
                errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
                }`}
                type="email"
                placeholder="이메일"
            />
            {errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}

            <input
                {...register("password")}
                className={`border w-[300px] p-[10px] rounded-sm ${
                errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
                }`}
                type="password"
                placeholder="비밀번호"
            />
            {errors.password && (
                <div className="text-red-500 text-sm">{errors.password.message}</div>
            )}

            <input
                {...register("passwordCheck")}
                className={`border w-[300px] p-[10px] rounded-sm ${
                errors?.passwordCheck
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
                type="password"
                placeholder="비밀번호 확인"
            />
            {errors.passwordCheck && (
                <div className="text-red-500 text-sm">
                {errors.passwordCheck.message}
                </div>
            )}

            <input
                {...register("name")}
                className={`border w-[300px] p-[10px] rounded-sm ${
                errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
                }`}
                type="text"
                placeholder="이름"
            />
            {errors.name && (
                <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}

            {signupResult && (
                <div className="text-green-500 text-sm">{signupResult}</div>
            )}

            <button
                disabled={isSubmitting}
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
            >
                다음
            </button>
            </div>
        ) : (
            // 닉네임
            <div className="flex flex-col gap-3 justify-center items-center">
            <h1 text-md text-bold>회원가입</h1>
            <img src="https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png"
            alt='프로필'
            className="rounded-full w-[200px] h-[200px]"></img>
            <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="border border-gray-300 w-[300px] p-[10px] rounded-sm"
                type="text"
                placeholder="닉네임을 입력하세요"
            />
            <button
                onClick={handleNicknameSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
                완료
            </button>
            </div>
        )}
        </div>
    );
};

export default SignupPage;
