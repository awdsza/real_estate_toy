import React, { useEffect, useState, useCallback } from "react";
import Apartment from "./Apartment";
import { useEstateAPIContext } from "../context/EstateAPIProvider";
import { useCommonContext } from "../context/CommonProvider";
import { throttling } from "../util/util";
export default function Apartments() {
  const { estateAPI } = useEstateAPIContext();
  const [apartState, setApartState] = useState({ list: [] });
  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(false); //스크롤을 끝까지 내려서 자동 실행중 상태값 저장
  const [hasLastPage, setHasLastPage] = useState(false);
  const {
    state: {
      searchSigunguCode,
      searchSidoCode,
      searchKeyword: keyword,
      numOfRows,
    },
    searchMode,
  } = useCommonContext();

  const { list } = apartState;
  const fetchList = useCallback(async () => {
    const apartData = await estateAPI.getApartList({
      numOfRows,
      keyword: searchMode === "codeSearch" ? "" : keyword,
      bubJeongDongCode:
        searchMode === "codeSearch"
          ? searchSigunguCode
            ? searchSigunguCode
            : searchSidoCode
          : "",
      page: page + 1,
    });
    if (parseInt(apartData.page) === 1) {
      setApartState((prev) => ({ ...apartData }));
    } else {
      setApartState((prev) => ({
        ...apartData,
        list: prev.list.concat(apartData.list),
      }));
    }
    if (page === apartState.lastPage) {
      setHasLastPage(false);
    }
    setPage((prev) => prev + 1);
    setFetching(false);
  }, [keyword, searchSidoCode, searchSigunguCode, page]);
  useEffect(() => {
    if (fetching) fetchList();
    else if (!hasLastPage) setFetching(false);
  }, [fetching]);
  useEffect(() => {
    const scrollEvent = throttling(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (clientHeight + scrollTop >= scrollHeight) {
        setFetching(true);
      }
    });
    setPage(0);
    setFetching(true);
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [keyword, searchSidoCode, searchSigunguCode]);
  return (
    <ul className="grid grid-cols-1 gap-1 gap-y-2 mt-5 overflow-y-auto max-h-full">
      {list.map((apart) => (
        <Apartment data={apart} key={apart.id} />
      ))}
    </ul>
  );
}
