import React, { useEffect, useCallback, useState } from "react";
import { useEstateAPIContext } from "../../context/EstateAPIProvider";
import { useSpinnerContext } from "../../context/SpinnerProvider";
import { lpad } from "../../util/util";
import { RxCaretDown } from "react-icons/rx";
export default function ApartTradeList({
  bubjeongdongCode,
  jibun,
  startYear,
  endYear,
  numOfRows = 10,
}) {
  const { closeSpinner, openSpinner } = useSpinnerContext();
  const { estateAPI } = useEstateAPIContext();
  const [page, setPage] = useState(0);
  const [tradeList, setTradeList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [fetching, setFetching] = useState(false);
  const getTradeData = useCallback(async () => {
    openSpinner();
    const result = await estateAPI.getApartTradeList({
      bubjeongdongCode,
      jibun,
      startYear,
      endYear,
      page: page + 1,
      numOfRows,
    });
    setPage((prev) => prev + 1);
    setHasNextPage(!(page === result.lastPage - 1));
    setTradeList((prev) => prev.concat(result.list));
    //setFetching(false);
    closeSpinner();
  }, [bubjeongdongCode, jibun, startYear, endYear, page]);
  useEffect(() => {
    if (fetching) getTradeData();
  }, [fetching]);
  useEffect(() => {
    setFetching(true);
  }, []);
  const selectDealList = () => {
    getTradeData();
  };
  return (
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
          {tradeList.map(
            ({
              deal_year: dealYear,
              deal_month: dealMonth,
              deal_day: dealDay,
              floor,
              deal_amount: dealAmount,
              area_for_exclusive_use: areaForExclusiveUse,
              id,
            }) => (
              <tr key={id}>
                <td className="text-center text-sm">
                  <span>{`${dealYear}년 ${lpad(dealMonth, "0", 2)}월 ${lpad(
                    dealDay,
                    "0",
                    2
                  )}일`}</span>
                </td>
                <td className="text-center text-sm">{areaForExclusiveUse}</td>
                <td className="text-center text-sm">{floor}</td>
                <td className="text-center text-sm">
                  {dealAmount.toLocaleString("ko-KR")}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {hasNextPage && (
        <div className="flex flex-nowrap justify-center">
          <button
            className="block h-8 w-full border border-gray-200 text-sm rounded-lg px-2 font-semibold"
            onClick={selectDealList}
          >
            <span>더 보기</span>
            <RxCaretDown className="text-xl inline" />
          </button>
        </div>
      )}
    </div>
  );
}
