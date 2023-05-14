import React from "react";
import { Link } from "react-router-dom";

export default function Apartment({ data }) {
  const { apartment_name, road_address, jibun_address, id } = data;
  return (
    <Link to={`/apartment/${id}`}>
      <li
        className={`py-5 box-content bg-[url('./images/bgAPT.jpeg')] bg-cover bg-no-repeat w-full`}
      >
        <dl>
          <dt className="text-base text-baseColor font-semibold mb-5">
            {apartment_name}
          </dt>
          <dd className="text-xs font-medium mb-2">{road_address}</dd>
          <dd className="text-xs font-medium">{jibun_address}</dd>
        </dl>
      </li>
    </Link>
  );
}
