import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { useJusoAPI } from "../../context/JusoProvider";
import { useHeaderContext } from "../../context/HeaderProvider";
import { useLocation } from "react-router-dom";
export default function BjdCodeSearch({ toggleSearchMode }) {
  const { jusoAPI } = useJusoAPI();
  const { submitSearch } = useHeaderContext();
  const { state } = useLocation();
  console.log(state);
  const [openSelectBox, setOpenSelectBox] = useState({
    isOpen: false,
    selectedBox: "sido",
  });
  const [selectedBjdName, setSelectedBjdName] = useState({
    sidoName: "",
    sigunguName: "",
  });
  const [bubJeongDongData, setBubJeongDongData] = useState({
    sido: [],
    sigungu: [],
  });
  const { sidoName, sigunguName } = selectedBjdName;
  const { isOpen, selectedBox } = openSelectBox;
  let searchSido = "",
    searchSigungu = "";
  if (state) {
    searchSido = state.sido;
    searchSigungu = state.sigungu;
  }
  //const { sido: searchSido, sigungu: searchSigungu } = searchState;
  useEffect(() => {
    async function initEffect() {
      const baseBubJeongDongData = {
        sidoList: await jusoAPI.getSido(),
        sigunguList: [],
      };
      if (searchSido) {
        const sigunguList = await jusoAPI.getSigunGu(searchSido);
        setBubJeongDongData({
          ...baseBubJeongDongData,
          sigunguList,
        });
        setSelectedBjdName({
          ...selectedBjdName,
          sidoName: baseBubJeongDongData.sidoList.find(
            ({ code }) => code === searchSido
          )?.name,
          sigunguName: sigunguList.find(
            ({ code }) => code.substring(0, 4) === searchSigungu
          )?.name,
        });
      } else {
        setBubJeongDongData({ ...baseBubJeongDongData });
        setSelectedBjdName({
          sidoName: "",
          sigunguName: "",
        });
      }
    }
    initEffect();
  }, [searchSido, searchSigungu]);
  const clickSelectBox = async (value) => {
    setOpenSelectBox({ isOpen: !isOpen, selectedBox: value });
  };
  const clickSidoCode = ({ code, name }) => {
    setSelectedBjdName((prev) => ({
      sidoName: name,
      sigunguName: "",
    }));
    setOpenSelectBox({ ...openSelectBox, isOpen: !isOpen });
    submitSearch({ sido: code, sigungu: "" });
  };
  const clickSigunguCode = ({ code, name }) => {
    setSelectedBjdName((prev) => ({ ...prev, sigunguName: name }));
    setOpenSelectBox({ ...openSelectBox, isOpen: !isOpen });
    submitSearch({ ...state, sigungu: code });
  };
  return (
    <div className="h-full w-full">
      <div className=" w-full h-8 flex flex-row items-center align-middle font-bold text-xl gap-0.5">
        <a className="text-baseColor" onClick={() => clickSelectBox("sido")}>
          {sidoName || "시/도 선택"}
        </a>
        <AiOutlineRight />
        <a className="text-baseColor" onClick={() => clickSelectBox("sigungu")}>
          {sigunguName || "시/군/구 선택"}
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
        <section className="border-1 bg-buttonColor">
          {/*클릭시 시군구 데이터 매핑 */}
          <ul className="grid grid-cols-3 [&>*:nth-child(3n)]:border-r-0">
            {(
              (selectedBox === "sido"
                ? bubJeongDongData.sidoList
                : bubJeongDongData.sigunguList) || []
            ).map((data) => (
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
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
