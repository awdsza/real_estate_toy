import React, { useEffect, useState } from "react";
import Apartment from "./Apartment";
import { useEstateAPIContext } from "../context/EstateAPIProvider";
import { useCommonContext } from "../context/CommonProvider";
export default function Apartments() {
  const { estateAPI } = useEstateAPIContext();
  const [apartList, setApartList] = useState([]);
  const {
    state: {
      page,
      numOfRows,
      searchSidoCode,
      searchSigunguCode,
      searchKeyword,
    },
    searchMode,
  } = useCommonContext();

  useEffect(() => {
    async function initEffect() {
      let searchParam = { page, numOfRows };
      if (searchMode === "bjdCodeSearch") {
        searchParam = {
          ...searchParam,
          bubJeongDongCode: searchSigunguCode
            ? searchSigunguCode
            : searchSidoCode,
        };
      } else {
        searchParam = { ...searchParam, searchKeyword };
      }
      setApartList(await estateAPI.getApartList(searchParam));
    }
    initEffect();
  }, [searchSidoCode, searchSigunguCode, searchKeyword, page]);
  return (
    <ul className="grid grid-cols-1 gap-1 gap-y-4 mt-5">
      {apartList.map((apart) => (
        <Apartment data={apart} key={apart.id} />
      ))}
    </ul>
  );
}
