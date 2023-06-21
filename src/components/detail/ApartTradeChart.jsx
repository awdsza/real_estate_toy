import React from "react";
import Chart from "react-apexcharts";
import { useEstateAPIContext } from "../../context/EstateAPIProvider";
import { useQuery } from "@tanstack/react-query";
export default function ApartTradeChart({ bubjeongdongCode, jibun, dealType }) {
  const { estateAPI } = useEstateAPIContext();
  const {
    isLoading,
    error,
    data: chartData,
  } = useQuery(
    ["chartData", bubjeongdongCode, jibun, dealType],
    async () => {
      const { tradeAvgData, allTradeData } =
        await estateAPI.getApartTradeChartData({
          bubjeongdongCode,
          jibun,
          dealType,
        });
      const scatterOption = {
        name: "Points",
        type: "scatter",
        //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
        data: allTradeData.map(({ dealAmount, dealDate }) => ({
          x: dealDate,
          y: parseInt(dealAmount),
        })),
      };

      const avgOption = {
        name: "Line",
        type: "line",
        data: tradeAvgData.map(({ dealAmount, dealDate }) => ({
          x: dealDate,
          y: parseInt(dealAmount),
        })),
      };
      const series = [{ ...scatterOption }, { ...avgOption }];
      return {
        series,
        options: {
          chart: {
            height: 400,
            width: window.innerWidth,
            type: "line",
            toolbar: {
              show: false,
            },
          },
          fill: {
            type: "solid",
          },
          markers: {
            size: [4, 0],
          },
          tooltip: {
            shared: false,
            intersect: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              //console.log(series, seriesIndex, dataPointIndex, w);
              const { x: dealdate, y: dealAmount } =
                w.config.series[0].data[dataPointIndex];
              return `<div class="bg-baseColor text-xs text-white font-medium py-2 px-1 box-content">
                거래일자 : ${dealdate}, 거래금액 : ${dealAmount}억</div>`;
              // '<div class="arrow_box">' +
              // "<span>" +
              //  +
              // ": " +
              // series[seriesIndex][dataPointIndex] +
              // "</span>" +
              // "</div>"
            },
          },
          legend: {
            show: false,
          },
          stroke: {
            width: 4,
            curve: "smooth",
          },
          yaxis: {
            min: 0,
            tickAmount: 3,
          },
          xaxis: {
            type: "datetime",
            categories: allTradeData.map(({ dealDate }) => {
              const [year, month, date] = dealDate.split(".");
              return `${parseInt(month)}/${parseInt(date)}/${year}`;
            }),
            tickAmount: 10,
            labels: {
              formatter: function (value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), "yy.MM");
              },
            },
          },
        },
      };
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
  if (!isLoading && !error) {
    return (
      <div id="chart" className="py-5 box-content">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={"100%"}
          width={"100%"}
        />
      </div>
    );
  }
}
