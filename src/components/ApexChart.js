"use client";

import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

export default function ApexChart(props) {
  const [Chart, setChart] = useState();
  const hasType = typeof props?.type !== "undefined";

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  if (!hasType || !Chart) {
    return null;
  }

  const StyledChart = styled(Chart)(({ theme }) => ({
    "& .apexcharts-canvas": {
      // Tooltip
      "& .apexcharts-tooltip": {
        // color: theme.palette.text.primary,
        // boxShadow: theme.customShadows.dropdown,
        // borderRadius: theme.shape.borderRadius * 1.25,
        "&.apexcharts-theme-light": {
          borderColor: "transparent",
        },
      },
      "& .apexcharts-xaxistooltip": {
        borderColor: "transparent",
        // color: theme.palette.text.primary,
        // boxShadow: theme.customShadows.dropdown,
        // borderRadius: theme.shape.borderRadius * 1.25,
        "&:before": {
          // borderBottomColor: alpha(theme.palette.grey[500], 0.24),
        },
        "&:after": {
          // borderBottomColor: alpha(theme.palette.background.default, 0.8),
        },
      },
      "& .apexcharts-tooltip-title": {
        textAlign: "center",
        // fontWeight: theme.typography.fontWeightBold,
        // backgroundColor: alpha(theme.palette.grey[500], 0.08),
        // color:
        // theme.palette.text[
        // theme.palette.mode === "light" ? "secondary" : "primary"
        // ],
      },
      // LEGEND
      "& .apexcharts-legend": {
        padding: 0,
      },
      "& .apexcharts-legend-series": {
        display: "inline-flex !important",
        alignItems: "center",
      },
      "& .apexcharts-legend-marker": {
        marginRight: 8,
      },
      "& .apexcharts-legend-text": {
        lineHeight: "18px",
        textTransform: "capitalize",
      },
      "& .apexcharts-xaxis-annotations": {
        "& text": {
          transform: "translateY(-12px)",
        },
        "& rect": {
          display: "none",
        },
      },
    },
  }));

  return <StyledChart {...props} />;
}
