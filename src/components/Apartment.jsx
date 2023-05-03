import React from "react";
import { Link } from "react-router-dom";

export default function Apartment({ data }) {
  const { as1, as2, as3, bjdCode, kaptName } = data;
  return (
    <Link to={`/apartment/${bjdCode}`}>
      <li
        className={`py-5 box-content bg-[url('./images/bgAPT.jpeg')] bg-cover bg-no-repeat w-full`}
      >
        <dl>
          <dt className="text-base font-semibold">{kaptName}</dt>
          <dd className="text-xs">{`${as1} ${as2} ${as3}`}</dd>
        </dl>
      </li>
    </Link>
  );
}
