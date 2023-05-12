import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useHeaderContext } from "../../context/HeaderProvider";
import { useLocation } from "react-router-dom";
export default function KeywordSearch({ toggleSearchMode }) {
  const { submitSearch } = useHeaderContext();
  const { state } = useLocation();
  const keyword = state ? state.keyword : "";
  const [text, setText] = useState("");
  useEffect(() => {
    setText(keyword);
  }, [keyword]);
  const onSubmit = (e) => {
    e.preventDefault();
    submitSearch({ keyword: text });
  };
  return (
    <Form onSubmit={onSubmit} className="h-full w-full">
      <div className=" w-full h-8 flex flex-row items-center align-middle font-bold text-base text-baseColor gap-0.5">
        <input
          type="text"
          className="h-full w-3/5 placeholder-current outline-none bg-mainColor"
          placeholder="찾으려는 아파트를 입력해주세요."
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <section className="absolute right-0 items-end">
          <button className="text-baseColor text-sm p-2" type="submit">
            <BsSearch className="h-4 w-4 inline text-baseColor" />
            검색
          </button>
          <button
            className="text-baseColor text-sm p-2"
            onClick={() => toggleSearchMode("bjdCodeSearch")}
          >
            <FaMapMarkerAlt className="h-4 w-4 inline text-baseColor" />
            지역 검색
          </button>
        </section>
      </div>
    </Form>
  );
}
