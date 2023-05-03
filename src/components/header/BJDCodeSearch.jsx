import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
const simpleData = [
  "서울시",
  "경기",
  "인천시",
  "부산시",
  "대전시",
  "대구시",
  "울산시",
  "광주시",
  "세종시",
  "강원도",
  "충북",
  "충남",
  "경북",
  "경남",
  "전북",
  "전남",
  "제주",
  "",
];
const simpleData2 = [
  "강남구",
  "강서구",
  "강동구",
  "강북구",
  "은평구",
  "마포구",
  "서대문구",
  "영등포구",
  "중구",
  "종로구",
  "강북구",
  "성북구",
  "동대문구",
  "노원구",
  "도봉구",
  "중랑구",
  "성동구",
  "광진구",
  "금천구",
  "관악구",
  "동작구",
  "서초구",
  "송파구",
];
export default function BjdCodeSearch({ toggleSearchMode, submitBjd }) {
  const [openSelectBox, setOpenSelectBox] = useState(false);
  const [selectedBjd, setSelectedBjd] = useState({
    sido: "",
    sigungu: "",
  });
  const { sido, sigungu } = selectedBjd;
  const [bubJeongDongData, setBubJeongDongData] = useState([...simpleData]);
  const clickSelectBox = (value) => {
    setOpenSelectBox((prev) => !prev);
    if (value === "sido") {
      setBubJeongDongData([...simpleData]);
      setSelectedBjd({ sido: "", sigungu: "" });
    } else {
      setBubJeongDongData([...simpleData2]);
      setSelectedBjd({ ...selectedBjd, sigungu: "" });
    }
  };
  const clickSidoCode = (value) => {
    setSelectedBjd((prev) => ({ sido: value, sigungu: "" }));
    setOpenSelectBox(false);
    submitBjd({ sido: value, sigungu: "" });
  };
  const clickSigunguCode = (value) => {
    setSelectedBjd((prev) => ({ ...prev, sigungu: value }));
    setOpenSelectBox(false);
    submitBjd({ ...selectedBjd, sigungu: value });
  };
  return (
    <div className="h-full w-full">
      <div className=" w-full h-8 flex flex-row items-center align-middle font-bold text-xl gap-0.5">
        <a className="text-baseColor" onClick={() => clickSelectBox("sido")}>
          {sido || "시/도 선택"}
        </a>
        <AiOutlineRight />
        <a className="text-baseColor" onClick={() => clickSelectBox("sigungu")}>
          {sigungu || "시/군/구 선택"}
        </a>

        <button
          className="text-baseColor text-sm p-2 absolute right-0"
          onClick={toggleSearchMode}
        >
          <BsSearch className="h-4 w-4 inline text-baseColor mr-1.5" />
          직접 검색
        </button>
      </div>
      {openSelectBox && (
        <section className="border-1 bg-buttonColor">
          {/*클릭시 시군구 데이터 매핑 */}
          <ul className="grid grid-cols-3 [&>*:nth-child(3n)]:border-r-0">
            {bubJeongDongData.map((d) => (
              <li className="text-center border-b-1 border-r-1   text-base">
                <button
                  className="inline-block w-full text-center align-middle py-1 box-content"
                  onClick={() =>
                    !sido ? clickSidoCode(d) : clickSigunguCode(d)
                  }
                >
                  {d}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
