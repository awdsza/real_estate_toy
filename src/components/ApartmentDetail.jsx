import React from "react";
import DetailTitle from "./detail/DetailTitle";
import { useLocation } from "react-router-dom";
import ApartTradeList from "./detail/ApartTradeList";
import ApartTradeChart from "./detail/ApartTradeChart";
export default function ApartmentDetail() {
  const {
    state: {
      apartmentName,
      roadAddress,
      jibunAddress,
      buildYear,
      jibun,
      bubjeongdongCode,
    },
  } = useLocation();
  const year = new Date().getFullYear();
  return (
    <div>
      <h1 className="font-bold text-2xl">{apartmentName} 매매 실거래가 </h1>
      <section className="flex flex-col gap-y-2">
        <DetailTitle title="아파트 기본정보">
          <p>도로명 : {roadAddress}</p>
          <p>지번주소 : {jibunAddress}</p>
          <p>건축년도 : {buildYear} 년 </p>
        </DetailTitle>
        <DetailTitle title="매매 실거래 내역">
          <ApartTradeChart bubjeongdongCode={bubjeongdongCode} jibun={jibun} />
          <ApartTradeList
            bubjeongdongCode={bubjeongdongCode}
            jibun={jibun}
            startYear={year - 3}
            endYear={year}
          />
        </DetailTitle>
      </section>
    </div>
  );
}
