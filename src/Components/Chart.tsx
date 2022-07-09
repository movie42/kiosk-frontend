import React, { useEffect, useState } from "react";
import Graph from "react-apexcharts";
import { Sales } from "../state/productItemState";

interface IChartProps {}

const Chart = () => {
  const [salesInfo, setSalesInfo] = useState([]);
  const [chartOption, setChartOption] = useState("today");
  const [selectedSalesInfo, setSelectedSalesInfo] = useState<Sales[]>([
    {
      name: "",
      price: 0,
      option: "",
      quantity: 0,
      createdAt: new Date().toUTCString(),
    },
  ]);
  const [chartState, setChartState] = useState<{
    options: ApexCharts.ApexOptions;
    series: ApexAxisChartSeries;
  }>({
    options: {
      chart: {
        id: "0",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  // const handleSelectedSalesInfo = (option: string) => {
  //   if (option === "today") {
  //     const today = salesInfo.sales.filter((value) => {
  //       const now = Date.now();
  //       const today = new Date(now).toDateString();
  //       const createDate = new Date(value.createdAt).toDateString();
  //       return today === createDate;
  //     });
  //     setSelectedSalesInfo(today);
  //   }
  // };

  // useEffect(() => {
  //   handleSelectedSalesInfo(chartOption);
  // }, [chartOption]);

  // useEffect(() => {
  //   setChartState({
  //     options: {
  //       chart: {
  //         id: chartOption,
  //       },
  //       xaxis: {
  //         type: "datetime",
  //         categories: selectedSalesInfo.map((item) => item.createdAt),
  //         labels: {
  //           formatter: (value) =>
  //             new Date(value).toLocaleTimeString("ko-KR", {
  //               hour: "numeric",
  //               minute: "numeric",
  //               hour12: false,
  //             }),
  //         },
  //       },
  //       stroke: {
  //         curve: "straight",
  //         lineCap: "square",
  //         width: 3,
  //         colors: ["#000000"],
  //       },
  //     },
  //     series: [
  //       {
  //         name: "주문",
  //         data: selectedSalesInfo.map((item) => item.quantity),
  //       },
  //     ],
  //   });
  // }, [selectedSalesInfo]);

  return (
    <>
      <h2>기간별 판매 실적</h2>
      <div className="button-box">
        <button onClick={() => setChartOption("today")}>오늘</button>
        <button onClick={() => setChartOption("month")}>이번달</button>
        <button onClick={() => setChartOption("6month")}>6개월</button>
        <button onClick={() => setChartOption("year")}>일년</button>
        <button>기간설정</button>
      </div>
      <div>
        <Graph
          options={chartState.options}
          series={chartState.series}
          //   type="bar"
        />
      </div>
    </>
  );
};

export default Chart;
