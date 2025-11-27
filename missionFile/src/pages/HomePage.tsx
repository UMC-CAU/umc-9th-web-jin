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
    const { data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfinteLpList(50, debouncedValue, PAGINATION_ORDER.desc);

    // const { data, isPending, isError } = useGetLpList({
    //     search,
    //     limit: 50,
    // });

    // ref 특정한 HTML 요소를 감지할 수 있음
    // inView 그 요소가 화면에 보이면 true
    const {ref, inView} = useInView({threshold:0})

    console.log(lps?.pages);

    useEffect(() => {
        if(inView) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            !isFetching && hasNextPage && fetchNextPage();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, isFetching, hasNextPage, fetchNextPage])

    if(isPending) {
        return <div className={"mt-20"}>Loading...</div>
    }

    if(isError) {
        return <div className={"mt-20"}>Error...</div>
    }

    return (
    <div className="container mx-auto px-4 py-6">
    <input
    className="border p-4 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
    <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
    {lps?.pages
    ?.map((page)=> page.data.data)
    ?.flat()
    ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
    {isFetching && <LpCardSkeletonList count={20}/>}
    </div>
    <div ref={ref} className="h-2">
    </div>
    </div>
    );
};

export default HomePage;