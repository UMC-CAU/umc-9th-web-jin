import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignupStep2 = () => {
    const navigate = useNavigate()
    const [nickname, setNickname] = useState("")

    const handleNicknameSubmit = () => {
    if (!nickname.trim()) return alert("닉네임을 입력해주세요!")
    console.log("닉네임 등록:", nickname)
    alert('회원가입이 완료되었습니다!')
    navigate("/")
    }

    return (
    <div className="flex flex-col gap-3 justify-center items-center">
    <h1 className="text-md font-bold">회원가입</h1>
    <img src="https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png" alt="프로필" className="rounded-full w-[200px] h-[200px]" />
    <input value={nickname} onChange={(e) => setNickname(e.target.value)} className="border border-gray-300 w-[300px] p-[10px] rounded-sm" type="text" placeholder="닉네임을 입력하세요" />
    <button onClick={handleNicknameSubmit} className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">
        완료
    </button>
    </div>
    )
}

export default SignupStep2;
