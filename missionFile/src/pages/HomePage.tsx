import { useEffect, useState } from "react";
import useGetInfinteLpList from "../hooks/queries/useGetInfinteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfinteLpList(50, debouncedValue, PAGINATION_ORDER.desc);

    // ref 특정한 HTML 요소를 감지할 수 있음
    // inView 그 요소가 화면에 보이면 true
    const { ref, inView } = useInView({ threshold: 0 })

    console.log(lps);

    useEffect(() => {
        if (inView) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            !isFetching && hasNextPage && fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, isFetching, hasNextPage, fetchNextPage])

    if (isError) {
        return <div className={"mt-20"}>Error...</div>
    }

    const hasData = lps?.pages?.some(page => page.data.data.length > 0);

    return (
        <div className="container mx-auto px-4 py-6">
            <input
                placeholder="검색어를 입력하세요."
                className="m-10 border p-4 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
            {isPending && <div className="text-center py-10"> 로딩 중 ... </div>}

            {!isPending && !hasData && !isFetching && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">아직 LP가 없습니다.</p>
                    <p className="text-gray-400 text-sm mt-2">첫 번째 LP를 추가해보세요!</p>
                </div>
            )}

            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
                {lps?.pages
                    ?.map((page) => page.data.data)
                    ?.flat()
                    ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
                {isFetching && <LpCardSkeletonList count={20} />}
            </div>
            <div ref={ref} className="h-2">
            </div>
        </div>
    );
};

export default HomePage;