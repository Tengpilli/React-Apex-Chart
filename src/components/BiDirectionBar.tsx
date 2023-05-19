import { ApexOptions } from "apexcharts";
import { useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Stock } from "../types/stock";

const BiDirectionBar: React.FC<{
  data: Stock[];
  colors?: string[];
  titleText?: string;
  maxpercentage?:number;
  minpercentage?:number;
}> = ({
  data = [],
  colors = ["#1ac4bd", "#ffa800"],
  titleText = "One minute Candle",
  maxpercentage=10,
  minpercentage=-10,
}) => {
  const [id] = useState<string>(`${Math.random()}`.replace(".", ""));

  const apexseries: ApexOptions["series"] = useMemo(
    () => [
      {
        name: "High",
        data: data.map((item) => item.high_percentage),
      },
      {
        name: "Low",
        data: data.map((item) => item.low_percentage),
      },
    ],
    [data]
  );

  const apexoption: ApexOptions = {
    chart: {
      type: "bar",
      height: 440,
      stacked: true,
    },
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
      formatter: function (val, opt) {
        const option: Stock = data[opt.dataPointIndex];
        return option.price;
      },
      offsetX: -5,
      dropShadow: {
        enabled: true,
        left: 2,
        top: 2,
        opacity: 0.5,
      },
      style: {
        fontSize: "20px",
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: minpercentage,
      max: maxpercentage,
      title: {
        text: "Date",
        style: {
          fontSize: "20px",
        },
      },
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val: number) {
          return val.toString();
        },
      },
      y: {
        formatter: function (val: number) {
          return Math.abs(val) + "%";
        },
      },
    },
    title: {
      text: titleText,
    },
    xaxis: {
      categories: data.map((item) => item?.date.toString()),
      title: {
        text: "Percent",
        style: {
          fontSize: "20px",
        },
      },
      labels: {
        formatter: function (val: string) {
          return Math.abs(Math.round(parseFloat(val))).toString() + "%";
        },
      },
    },
  };

  return (
    <div id={`bi_direction_bar_${id}`}>
      <ReactApexChart
        options={apexoption}
        series={apexseries}
        type="bar"
        height={440}
      />
    </div>
  );
};

export default BiDirectionBar;
