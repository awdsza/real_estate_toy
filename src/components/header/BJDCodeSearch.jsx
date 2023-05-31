import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { useJusoAPI } from "../../context/JusoProvider";
import { useHeaderContext } from "../../context/HeaderProvider";
import { useCommonContext } from "../../context/CommonProvider";
import { useQuery } from "@tanstack/react-query";
export default function BjdCodeSearch({ toggleSearchMode }) {
  const { jusoAPI } = useJusoAPI();
  const { submitSearch } = useHeaderContext();
  const { state } = useCommonContext();
  const [openSelectBox, setOpenSelectBox] = useState({
    isOpen: false,
    selectedBox: "sido",
  });
  const { isOpen, selectedBox } = openSelectBox;
  const { searchSigunguCode = undefined, searchSidoCode = undefined } = state;
  const { data: sidoList } = useQuery(
    ["sidoList"],
    async () => await jusoAPI.getSido(),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const { data: sigunguList } = useQuery(
    ["sigunguList", searchSidoCode],
    async () => await jusoAPI.getSigunGu(searchSidoCode),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
  const clickSelectBox = async (value) => {
    setOpenSelectBox({ isOpen: !isOpen, selectedBox: value });
  };
  const clickSidoCode = ({ code }) => {
    setOpenSelectBox({ ...openSelectBox, isOpen: !isOpen });
    submitSearch({ searchSidoCode: code, searchSigunguCode: "" });
  };
  const clickSigunguCode = ({ code }) => {
    setOpenSelectBox({ ...openSelectBox, isOpen: !isOpen });
    submitSearch({ ...state, searchSigunguCode: code });
  };

  return (
    <div className="h-full w-full">
      <div className=" w-full h-8 flex flex-row items-center align-middle font-bold text-xl gap-0.5">
        <a className="text-baseColor" onClick={() => clickSelectBox("sido")}>
          {sidoList?.find(({ code }) => code === searchSidoCode)?.name ||
            "시/도 선택"}
        </a>
        <AiOutlineRight />
        <a className="text-baseColor" onClick={() => clickSelectBox("sigungu")}>
          {sigunguList?.find(
            ({ code }) => code.substring(0, 5) === searchSigunguCode
          )?.name || "시/군/구 선택"}
        </a>

        <button
          className="text-baseColor text-sm p-2 absolute right-0"
          onClick={() => toggleSearchMode("keywordSearch")}
        >
          <BsSearch className="h-4 w-4 inline text-baseColor mr-1.5" />
          직접 검색
        </button>
      </div>
      {isOpen && (
        <section className="border-1 bg-buttonColor box-border">
          {/*클릭시 시군구 데이터 매핑 */}
          <ul className="grid grid-cols-3 [&>*:nth-child(3n)]:border-r-0">
            {((selectedBox === "sido" ? sidoList : sigunguList) || []).map(
              (data) => (
                <li
                  className="text-center border-b-1 border-r-1   text-base"
                  key={data.code}
                >
                  <button
                    className="inline-block w-full text-center align-middle py-1 box-content"
                    onClick={() =>
                      selectedBox === "sido"
                        ? clickSidoCode(data)
                        : clickSigunguCode(data)
                    }
                  >
                    {data.name}
                  </button>
                </li>
              )
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
