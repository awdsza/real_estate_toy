import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Apartment({ data }) {
  const {
    apartmentName,
    roadAddress,
    jibunAddress,
    id,
    bubjeongdongCode,
    dealDate,
    buildYear,
  } = data;
  const navigate = useNavigate();
  return (
    <li
      className={`py-5 box-content bg-[url('./images/bgAPT.jpeg')] bg-cover bg-no-repeat w-full`}
    >
      <a
        onClick={() =>
          navigate(`/apartment/${id}`, {
            state: {
              apartmentName,
              roadAddress,
              jibunAddress,
              id,
              bubjeongdongCode,
              dealDate,
              buildYear,
            },
          })
        }
      >
        <dl>
          <dt className="text-base text-baseColor font-semibold mb-5">
            {apartmentName}
          </dt>
          <dd className="text-xs font-medium mb-2">{roadAddress}</dd>
          <dd className="text-xs font-medium">{jibunAddress}</dd>
        </dl>
      </a>
    </li>
  );
}
