import { useEffect, useState } from "react"; 
import { getMyInfo } from "../apis/auth"; 
import { ResponseMyInfoDto } from "../types/auth"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const{logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null> (null); 
        
    useEffect(() => {
        const getData = async() => {
            try {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
            } catch(error) {
                console.error('정보 불러오기 실패', error);
            }
        };
        
        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate('/');
    };

    return ( 
<div className="flex flex-col gap-3 justify-center items-center m-10">
    <h1>{data?.data.name}님 환영합니다!</h1>
            <h1 className="text-md font-bold">내 정보</h1>
            <img src="https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png"
            alt='프로필'
            className="rounded-full w-[200px] h-[200px]"></img>
            <h1 className="text-md font-semibold">이름 &nbsp;
            {data?.data.name} </h1> 
            <h1 className="text-md font-semibold">이메일 &nbsp; 
            {data?.data.email} </h1>
    <button onClick={handleLogout}
    className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90">Log out</button>
</div>
); 
}; export default MyPage;