import React, { useEffect, useCallback, useState } from "react";
import { useEstateAPIContext } from "../../context/EstateAPIProvider";
import { useSpinnerContext } from "../../context/SpinnerProvider";
import { useCommonContext } from "../../context/CommonProvider";
import { RxCaretDown } from "react-icons/rx";
export default function ApartTradeList({
  bubjeongdongCode,
  jibun,
  numOfRows = 10,
  dealType,
}) {
  const { closeSpinner, openSpinner } = useSpinnerContext();
  const { estateAPI } = useEstateAPIContext();
  const [page, setPage] = useState(0);
  const [tradeList, setTradeList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [fetching, setFetching] = useState(false);
  const { lpad, convertCurrencyUnit } = useCommonContext();
  const getTradeData = useCallback(async () => {
    openSpinner();
    const result = await estateAPI.getApartTradeList({
      bubjeongdongCode,
      jibun,
      dealType,
      page: page + 1,
      numOfRows,
    });
    setPage((prev) => prev + 1);
    setHasNextPage(!(page === result.lastPage - 1));
    setTradeList((prev) => prev.concat(result.list));
    setFetching(false);
    closeSpinner();
  }, [bubjeongdongCode, jibun, dealType, page]);
  useEffect(() => {
    console.log(fetching);
    if (fetching) getTradeData();
    else if (fetching && !hasNextPage) setFetching(false);
  }, [fetching]);
  useEffect(() => {
    setTradeList([]);
    setFetching((prev) => true);
  }, [bubjeongdongCode, jibun, dealType]);

  return (
    <div className="table-wrp block min-h-80">
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
            <th className="border">거래유형</th>
          </tr>
        </thead>
        <tbody className="min-h-52 overflow-y-auto">
          {(tradeList || []).map(
            ({
              deal_year: dealYear,
              deal_month: dealMonth,
              deal_day: dealDay,
              floor,
              deal_amount: dealAmount,
              area_for_exclusive_use: areaForExclusiveUse,
              id,
              deal_type: dealType,
              deal_type_name: dealTypeName,
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
                  {dealType === "monthlyRent"
                    ? `${convertCurrencyUnit(dealAmount.split("/")[0])}/
                      ${convertCurrencyUnit(dealAmount.split("/")[1])}`
                    : convertCurrencyUnit(dealAmount)}
                </td>
                <td className="text-center text-sm">
                  {dealType === "trade" ? "매매" : dealTypeName}
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
            onClick={getTradeData}
          >
            <span>더 보기</span>
            <RxCaretDown className="text-xl inline" />
          </button>
        </div>
      )}
    </div>
  );
}
