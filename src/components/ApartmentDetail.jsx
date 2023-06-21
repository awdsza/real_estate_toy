import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ApartTradeList from "./detail/ApartTradeList";
import ApartTradeChart from "./detail/ApartTradeChart";
import Button from "./common/Button";
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
  const [dealType, setDealType] = useState("trade");
  const year = new Date().getFullYear();

  return (
    <>
      <h1 className="font-bold text-2xl my-1 text-center">{apartmentName}</h1>
      <section className="flex flex-col gap-y-2">
        <div className="box-content px-2 relative bg-base">
          <section className="flex items-center align-middle justify-between">
            <h2 className="font-semibold text-xl">아파트거래내역</h2>
          </section>
          <div className="overflow-auto">
            <p>도로명 : {roadAddress}</p>
            <p>지번주소 : {jibunAddress}</p>
            <p>건축년도 : {buildYear} 년 </p>
          </div>
        </div>
        <div className="box-content px-2  bg-base h-full">
          <Button
            title="매매"
            clickFunc={() => setDealType("trade")}
            isActive={dealType === "trade"}
          />
          <Button
            title="전월세"
            clickFunc={() => setDealType("rent")}
            isActive={dealType === "rent"}
          />
          <ApartTradeChart
            bubjeongdongCode={bubjeongdongCode}
            jibun={jibun}
            dealType={dealType}
          />
          <ApartTradeList
            bubjeongdongCode={bubjeongdongCode}
            jibun={jibun}
            dealType={dealType}
          />
        </div>
      </section>
    </>
  );
}
