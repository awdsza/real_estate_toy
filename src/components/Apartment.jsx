import React from "react";
import { Link } from "react-router-dom";

export default function Apartment({ data }) {
  const { as1, as2, as3, bjdCode, kaptName, roadName1, roadName2 } = data;
  return (
    <Link to={`/apartment/${bjdCode}`}>
      <li
        className={`py-5 box-content bg-[url('./images/bgAPT.jpeg')] bg-cover bg-no-repeat w-full`}
      >
        <dl>
          <dt className="text-base text-baseColor font-semibold mb-5">
            {kaptName}
          </dt>
          <dd className="text-xs font-medium mb-2">{`${as1} ${as2} ${as3}`}</dd>
          <dd className="text-xs font-medium mb-2">{roadName1}</dd>
          <dd className="text-xs font-medium">{roadName2}</dd>
        </dl>
      </li>
    </Link>
  );
}
