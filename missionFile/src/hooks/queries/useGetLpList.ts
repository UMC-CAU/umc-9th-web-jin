import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => 
        getLpList({
            cursor,
            search,
            order,
            limit,
        }),

        // 데이터가 신선하다고 간주하는 시간
        // 이 시간 동안은 캐시된 데이터를 그대로 사용, 마운트되거나 청애 포커스 들어오는 경우도 재요청 하지 않음
        staleTime: 1000 * 60 * 5,

        // 비활성 상태인 쿼리 데이터가 캐시에 남아있는 시간
        // staleTime이 지나더라도 일정 시간 동안 메모리에 보관
        gcTime: 100 * 60 * 10,

        // 조건에 따라 쿼리를 실행 여부 제어
        // enabled: Boolean(search),

        select: (data) => data.data,
    });
}

export default useGetLpList