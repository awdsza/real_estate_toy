import React, { useState } from "react";
import Apartment from "./Apartment";
const sampleData = [
  {
    as1: "서울시",
    as2: "은평구",
    as3: "쌍문동",
    bjdCode: "1111100111",
    kaptName: "쌍문 삼성 레미안",
    roadName1: "서울시 은평구 쌍문로100",
    roadName2: "서울시 은평구 쌍문리 33-1",
  },
];
export default function Apartments() {
  const [list, setList] = useState(sampleData);
  return (
    <ul className="grid grid-cols-1 gap-1 gap-y-4 mt-5">
      {list.map((l) => (
        <Apartment data={l} key={l.kaptCode} />
      ))}
    </ul>
  );
}
