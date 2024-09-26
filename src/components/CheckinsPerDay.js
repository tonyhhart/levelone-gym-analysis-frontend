"use client";

import { useMemo, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { AppContext } from "../AppContextProvider";
import ApexChart from "./ApexChart";

const weekdayBR = (day) => {
  switch (day) {
    case "Monday":
      return "SEG";
    case "Tuesday":
      return "TER";
    case "Wednesday":
      return "QUA";
    case "Thursday":
      return "QUI";
    case "Friday":
      return "SEX";
    case "Saturday":
      return "SAB";
    case "Sunday":
      return "DOM";
    default:
      return day;
  }
};

export default function CheckinsPerDay() {
  const { dashboard } = useContext(AppContext);

  const { labels, colors, series, options } = useMemo(() => {
    const labels = (dashboard.checkins_by_day_time ?? [])
      .map((d) => weekdayBR(d.day_of_week))
      .filter((d1, i, a) => i === a.findIndex((d2) => d2 === d1));

    const data = labels.map((weekday) =>
      (dashboard.checkins_by_day_time ?? [])
        .filter((d) => weekdayBR(d.day_of_week) === weekday)
        .reduce((total, current) => (total += current.checkin_count), 0)
    );

    return {
      labels: labels,
      series: [
        {
          name: "Checkin",
          type: "bar",
          fill: "solid",
          data: data,
        },
      ],
    };
  }, [dashboard.checkins_by_day_time]);

  const peakHour = useMemo(() => {
    let max = -Infinity;
    let maxIndex = -1;

    series.forEach((series) => {
      series.data.forEach((value, index) => {
        if (value > max) {
          max = value;
          maxIndex = index;
        }
      });
    });

    return maxIndex !== -1 ? labels[maxIndex] : false;
  }, [labels, series]);

  const chartOptions = {
    chart: { toolbar: { show: false } },
    colors,
    plotOptions: {
      bar: {},
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    annotations:
      peakHour !== false
        ? {
            xaxis: [
              {
                strokeDashArray: 4,
                x: peakHour,
                label: {
                  text: "MAIOR",
                  orientation: "horizontal",
                },
              },
            ],
          }
        : null,
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== "undefined") {
            return `${value.toFixed(0)} checkins`;
          }
          return value;
        },
      },
    },
    ...options,
  };

  return (
    <Card
      sx={{
        backgroundColor: "white",
        boxShadow: "0 14px 26px rgba(0, 0, 0, 0.04)",
        border: "1px solid #55555522",
      }}
    >
      <Box sx={{ p: 3, pb: 1 }}>
        <ApexChart
          dir="ltr"
          type="bar"
          series={series}
          options={chartOptions}
          width="100%"
          height={200}
        />
      </Box>
    </Card>
  );
}
