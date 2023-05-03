import React, { useState } from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import { BsHouseFill } from "react-icons/bs";
import BubjungDongCodeSearch from "./BJDCodeSearch";
import KeywordSearch from "./KeywordSearch";
export default function SearchHeader() {
  const [searchMode, setSearchMode] = useState({
    regCodeMode: true,
    keywordMode: false,
  });
  const { regCodeMode, keywordMode } = searchMode;

  const navigate = useNavigate();

  const toggleSearchMode = () => {
    setSearchMode({
      ...searchMode,
      regCodeMode: !regCodeMode,
      keywordMode: !keywordMode,
    });
  };
  const submitSearch = (searchData) => {
    const { keyword, sido, sigungu } = searchData;

    navigate(
      `/apartment/list?${
        keyword ? `keyword=${keyword}` : `bjdCode=${sigungu ? sigungu : sido}`
      }`
    );
  };
  const clickRegCode = (value) => {
    console.log(value);
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
        {regCodeMode ? (
          <BubjungDongCodeSearch
            toggleSearchMode={toggleSearchMode}
            submitBjd={submitSearch}
          />
        ) : (
          <KeywordSearch
            toggleSearchMode={toggleSearchMode}
            submitKeyword={submitSearch}
          />
        )}
      </section>
    </header>
  );
}
