import { useState } from "react"
import SignupStep1 from "../components/SignupStep1"
import SignupStep2 from "../components/SignupStep2"

const SignupPage = () => {
  const [step, setStep] = useState<1 | 2>(1)
  const [signupResult, setSignupResult] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {step === 1 ? (
        <>
          <SignupStep1 onNext={() => setStep(2)} setSignupResult={setSignupResult} />
          {signupResult && <div className="text-green-500 text-sm">{signupResult}</div>}
        </>
      ) : (
        <SignupStep2 />
      )}
    </div>
  )
}

export default SignupPage
