import React from "react";
import { Link } from "react-router-dom";
import { BsHouseFill } from "react-icons/bs";
import BubjungDongCodeSearch from "./BJDCodeSearch";
import KeywordSearch from "./KeywordSearch";
import { useHeaderContext } from "../../context/HeaderProvider";
export default function SearchHeader() {
  const { searchMode, changeSearchMode } = useHeaderContext();
  const toggleSearchMode = (mode) => {
    changeSearchMode(mode);
  };

  return (
    <header className="flex flex-col h-16">
      <div className="w-full text-bold text-xl text-baseColor">
        <Link to="/">
          <BsHouseFill className="w-8 h-full mr-2 text-baseColor inline" />
          <h1 className="inline">아파트 실거래가 검색 페이지</h1>
        </Link>
      </div>
      <section className="flex flex-row items-center w-full relative h-8 gap-2 mb-2">
        {searchMode === "bjdCodeSearch" ? (
          <BubjungDongCodeSearch toggleSearchMode={toggleSearchMode} />
        ) : (
          <KeywordSearch toggleSearchMode={toggleSearchMode} />
        )}
      </section>
    </header>
  );
}
