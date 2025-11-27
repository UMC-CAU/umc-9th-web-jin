import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";
import usePostLike from "../hooks/queries/mutations/usePostLike";
import useDeleteLike from "../hooks/queries/mutations/useDeleteLike";
import { useState } from "react";

const LpDetailPage = () => {
    const { lpId } = useParams();
    const { accessToken } = useAuth();
    const { data: lp, isPending, isError } = useGetLpDetail({ lpId: Number(lpId) });

    const { data: me } = useGetMyInfo(accessToken);
    const { mutate: likeMutate } = usePostLike();
    const { mutate: disLikeMutate } = useDeleteLike();

    const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id)

    const handleLikeLp = () => {
        likeMutate({ lpId: Number(lpId) });
    };

    const handleDislikeLp = () => {
        disLikeMutate({ lpId: Number(lpId) });
    }

    // 임시 좋아요 버튼
    const [isPreLiked, setIsPreLiked] = useState(false);

    const handleLike = () => {
        setIsPreLiked((prev) => !prev);
    }

    if (isPending) {
        return <div className="mt-20 text-center">로딩 중...</div>
    }

    if (isError) {
        return <div className="mt-20 text-center text-red-500">LP를 불러오는데 실패했습니다.</div>
    }

    if (!lp) {
        return <div className="mt-20 text-center">LP를 찾을 수 없습니다.</div>
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-12">
            <div className="max-w-4xl mx-auto">
                {/* 썸네일 이미지 */}
                <div className="mb-6">
                    <img
                        src={lp.data.thumbnail}
                        alt={lp.data.title}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* 제목과 좋아요 버튼 */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-bold text-gray-900">{lp.data.title}</h1>
                    <button
                        onClick={handleLike}
                        className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label={isPreLiked ? "좋아요 취소" : "좋아요"}
                    >
                        <Heart
                            color={isPreLiked ? "red" : "gray"}
                            fill={isPreLiked ? "red" : "transparent"}
                            size={32}
                        />
                    </button>
                </div>


                {/* 내용 */}
                <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {lp.data.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LpDetailPage;