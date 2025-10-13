import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { postSignup } from "../apis/auth"
import { useState } from "react"

const schema = z
    .object({
        email: z
        .string()
        .email({ message: "올바른 이메일 형식이 아닙니다." }),

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

    interface SignupStep1Props {
    onNext: () => void
    setSignupResult: (msg: string) => void
    }

    const SignupStep1 = ({ onNext, setSignupResult }: SignupStep1Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [currentStep, setCurrentStep] = useState(1); 

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordCheck, ...rest } = data;
        try {
        await postSignup(rest);
        console.log("회원가입 정보:", rest);
        setSignupResult("회원가입 성공!");
        onNext();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
        const msg = err.response?.data?.message || "회원가입 실패";
        setSignupResult(msg);
        }
    };

    
    const handleNextStep = async () => {
        let valid = false;
        if (currentStep === 1) valid = await trigger("email");
        if (currentStep === 2) valid = await trigger(["password", "passwordCheck"]);
        if (currentStep === 3) valid = await trigger("name");

        if (!valid) return;

        if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
        } else {
        handleSubmit(onSubmit)();
        }
    };

    return (
        <>
        <div className="flex flex-col gap-3 w-[300px]">
            {/* 이메일 단계 */}
            {currentStep === 1 && (
            <>
                <input
                {...register("email")}
                className={`border p-[10px] rounded-sm ${
                    errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
                }`}
                type="email"
                placeholder="이메일"
                />
                {errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
                )}
            </>
            )}

            {/* 비밀번호 단계 */}
            {currentStep === 2 && (
            <>
                <div className="relative">
                <input
                    {...register("password")}
                    className={`border w-full p-[10px] rounded-sm ${
                    errors?.password
                        ? "border-red-500 bg-red-200"
                        : "border-gray-300"
                    }`}
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호"
                />
                {errors.password && (
                    <div className="text-red-500 text-sm">{errors.password.message}</div>
                )}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                >
                    {showPassword ? "🙈" : "👁️"}
                </button>
                </div>

                <div className="relative">
                <input
                    {...register("passwordCheck")}
                    className={`border w-full p-[10px] rounded-sm ${
                    errors?.passwordCheck
                        ? "border-red-500 bg-red-200"
                        : "border-gray-300"
                    }`}
                    type={showPasswordCheck ? "text" : "password"}
                    placeholder="비밀번호 확인"
                />
                {errors.passwordCheck && (
                    <div className="text-red-500 text-sm">
                    {errors.passwordCheck.message}
                    </div>
                )}
                <button
                    type="button"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                >
                    {showPasswordCheck ? "🙈" : "👁️"}
                </button>
                </div>
            </>
            )}

            {/* 이름 단계 */}
            {currentStep === 3 && (
            <>
                <input
                {...register("name")}
                className={`border p-[10px] rounded-sm ${
                    errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
                }`}
                type="text"
                placeholder="이름"
                />
                {errors.name && (
                <div className="text-red-500 text-sm">{errors.name.message}</div>
                )}
            </>
            )}

            {/* 버튼 */}
            <button
            disabled={isSubmitting}
            type="button"
            onClick={handleNextStep}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
            >
            {currentStep < 3 ? "다음" : "회원가입"}
            </button>
        </div>
        </>
    );
};

export default SignupStep1;
