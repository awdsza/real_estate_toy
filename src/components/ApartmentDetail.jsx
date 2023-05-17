import React, { useEffect, useState } from "react";
import Accordian from "./common/Accordian";
import { useLocation } from "react-router-dom";
import { useEstateAPIContext } from "../context/EstateAPIProvider";
import { lpad } from "../util/util";
export default function ApartmentDetail() {
  const [apartTradeList, setApartTradeList] = useState([]);
  const { estateAPI } = useEstateAPIContext();
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
  useEffect(() => {
    const fetchDetailData = async () => {
      const { data: tradeList } = await estateAPI.getApartTradeList({
        bubjeongdongCode,
        jibun,
      });
      setApartTradeList(tradeList);
    };
    fetchDetailData();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-2xl">{apartmentName} 매매 실거래가 </h1>
      <section className="flex flex-col gap-y-2">
        <Accordian
          title="아파트 기본정보"
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
              <thead className="sticky top-0  bg-baseColor text-base">
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
                </tr>
              </thead>
              <tbody className="h-52 overflow-y-auto">
                {apartTradeList.map(
                  ({
                    deal_year,
                    deal_month,
                    deal_day,
                    floor,
                    deal_amount,
                    apartment_name,
                    area_for_exclusive_use,
                    id,
                  }) => (
                    <tr key={id}>
                      <td className="text-center text-sm">
                        <span>{`${deal_year}년 ${lpad(
                          deal_month,
                          "0",
                          2
                        )}월 ${lpad(deal_day, "0", 2)}일`}</span>
                      </td>
                      <td className="text-center text-sm">
                        {area_for_exclusive_use}
                      </td>
                      <td className="text-center text-sm">{floor}</td>
                      <td className="text-center text-sm">
                        {deal_amount.toLocaleString("ko-KR")}{" "}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Accordian>
      </section>
    </div>
  );
}
