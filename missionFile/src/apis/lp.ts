import { axiosInstance } from "./axios"
import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import type { RequestLpDto, ResponseLikeLpDto, ResponseLpDto } from "../types/lp";
import { mockLpData } from "../mocks/lpData";

// 목업 데이터 사용 여부 (개발 중에는 true로 설정)
const USE_MOCK_DATA = true;

export const getLpList = async (
    paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
    // 목업 데이터 사용 시
    if (USE_MOCK_DATA) {
        // 검색어 필터링
        let filteredData = mockLpData;
        if (paginationDto.search) {
            filteredData = mockLpData.filter(lp =>
                lp.title.toLowerCase().includes(paginationDto.search!.toLowerCase()) ||
                lp.content.toLowerCase().includes(paginationDto.search!.toLowerCase())
            );
        }

        // 페이지네이션 처리
        const limit = paginationDto.limit || 10;
        const cursor = paginationDto.cursor || 0;
        const startIndex = cursor;
        const endIndex = startIndex + limit;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        const hasNext = endIndex < filteredData.length;
        const nextCursor = hasNext ? endIndex : null;

        return {
            status: true,
            statusCode: 200,
            message: "Lp 목록 조회에 성공했습니다.",
            data: {
                data: paginatedData,
                nextCursor,
                hasNext
            }
        };
    }

    // 실제 API 호출
    const { data } = await axiosInstance.get("/v1/lps", {
        params: paginationDto,
    });

    return data;
};

export const getLpDetail = async ({ lpId }: RequestLpDto): Promise<ResponseLpDto> => {
    // 목업 데이터 사용 시
    if (USE_MOCK_DATA) {
        const lp = mockLpData.find(item => item.id === lpId);

        if (!lp) {
            throw new Error("LP를 찾을 수 없습니다.");
        }

        return {
            status: true,
            statusCode: 200,
            message: "Lp 상세 조회에 성공했습니다.",
            data: lp
        };
    }

    // 실제 API 호출
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`)

    return data;
};

export const postLike = async ({ lpId }: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
};

export const deleteLike = async ({ lpId }: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

    return data;
};