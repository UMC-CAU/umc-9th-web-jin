import { useEffect, useState } from "react"; 
import { getMyInfo } from "../apis/auth"; 
import { ResponseMyInfoDto } from "../types/auth"; 

const MyPage = () => 
    { const [data, setData] = useState<ResponseMyInfoDto>(); 
        
    useEffect(() => { 
        const getData = async() => { 
            const response = await getMyInfo(); 
            console.log(response); 
                
            setData(response) ;
        }; 
            
    getData(); 
}, []); 
    return ( 
<div className="flex flex-col gap-3 justify-center items-center m-10">
            <h1 className="text-md font-bold">내 정보</h1>
            <img src="https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png"
            alt='프로필'
            className="rounded-full w-[200px] h-[200px]"></img>
            <h1 className="text-md font-semibold">이름 &nbsp;
            {data?.data.name} </h1> 
            <h1 className="text-md font-semibold">이메일 &nbsp; 
            {data?.data.email} </h1>
            </div>
); 
}; export default MyPage;