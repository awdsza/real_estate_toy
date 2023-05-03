import React, { useEffect, useState } from "react";
import Apartment from "./Apartment";
import EstateDataAPI from "../api/EstateDataAPI";
export default function Apartments() {
  const api = new EstateDataAPI();
  const [list, setList] = useState([]);
  useEffect(() => {
    async function getApartList() {
      setList(await api.getApartList());
    }
    getApartList();
  }, []);
  return (
    <ul className="grid grid-cols-1 gap-1 gap-y-5 mt-5">
      {list.map((l) => (
        <Apartment data={l} key={l.kaptCode} />
      ))}
    </ul>
  );
}
