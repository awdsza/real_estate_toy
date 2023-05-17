import React, { useCallback, useEffect } from "react";
import Accordian from "./common/Accordian";
import { useParams, useLocation } from "react-router-dom";
const simpleData = new Array(50).fill({
  dealDate: "2023년 4월 17일",
  areaForExclusiveUse: "68.27",
  floor: "11",
  dealPrice: "48,900",
  apartmentName: "skView1차",
});
export default function ApartmentDetail() {
  const { apartId } = useParams();
  const {
    state: { apartmentName, roadAddress, jibunAddress, buildYear },
  } = useLocation();
  const fetchDetailData = useCallback(async () => {}, []);
  useEffect(() => {
    fetchDetailData();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-2xl">{apartmentName} 매매 실거래가 </h1>
      <section className="flex flex-col gap-y-2">
        <Accordian
          title={`아파트 기본정보`}
          titleClass="font-semibold text-xl"
          accordianClass="pr-2"
        >
          <p>{apartmentName}</p>
          <p>도로명 : {roadAddress}</p>
          <p>지번주소 : {jibunAddress}</p>
          <p>건축년도 : {buildYear} 년 </p>
        </Accordian>
        <Accordian
          title="매매 실거래"
          titleClass="font-semibold text-xl"
          accordianClass="pr-2"
        >
          <div className="table-wrp block max-h-80">
            <table className="table-auto w-full">
              <thead className="sticky top-0  bg-baseColor">
                <tr>
                  <th className="border">거래일</th>
                  <th className="border">
                    전용면적
                    <br />
                    (㎡)
                  </th>
                  <th className="border">층</th>
                  <th className="border">
                    거래금액
                    <br />
                    (만원)
                  </th>
                  <th className="border">아파트명</th>
                </tr>
              </thead>
              <tbody className="h-52 overflow-y-auto">
                {simpleData.map((data) => (
                  <tr>
                    <td className="text-center">
                      <span>{data.dealDate}</span>
                    </td>
                    <td className="text-center">{data.areaForExclusiveUse}</td>
                    <td className="text-center">{data.floor}</td>
                    <td className="text-center">{data.dealPrice} </td>
                    <td className="text-center">{data.apartmentName} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Accordian>
      </section>
    </div>
  );
}
