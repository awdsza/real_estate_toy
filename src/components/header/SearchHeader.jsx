import React from "react";
import { Link } from "react-router-dom";
import { BsHouseFill } from "react-icons/bs";
import BubjungDongCodeSearch from "./BJDCodeSearch";
import KeywordSearch from "./KeywordSearch";
import { useCommonContext } from "../../context/CommonProvider";
export default function SearchHeader() {
  const { searchMode, changeSearchMode } = useCommonContext();
  const toggleSearchMode = (mode) => {
    changeSearchMode(mode);
  };

  return (
    <header className="flex flex-col h-16 w-full sticky top-0 left-0 right-0 z-10 bg-mainColor">
      <div className="w-full text-bold text-xl text-baseColor">
        <Link to="/">
          <BsHouseFill className="w-8 h-full mr-2 text-baseColor inline" />
          <h1 className="inline">아파트 실거래가 검색 페이지</h1>
        </Link>
      </div>
      <section className="flex flex-row items-center w-full relative h-8 gap-2 mb-2">
        {searchMode === "codeSearch" ? (
          <BubjungDongCodeSearch toggleSearchMode={toggleSearchMode} />
        ) : (
          <KeywordSearch toggleSearchMode={toggleSearchMode} />
        )}
      </section>
    </header>
  );
}
