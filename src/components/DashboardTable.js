import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { AppContext } from "../AppContextProvider";
import { format } from "date-fns";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nome", width: 250 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    valueFormatter: (value) => (value === "active" ? "Ativo" : "Inativo"),
  },
  {
    field: "total_checkins",
    headerName: "Total Checking",
    number: true,
    width: 150,
  },
  {
    field: "average_duration",
    headerName: "Média Duração Treino",
    valueFormatter: (value) => Number(value).toFixed(0) + "min",
    width: 150,
  },
  {
    field: "last_start_date",
    headerName: "Último Checkin",
    valueFormatter: (value) => format(value, "dd/MM/yyyy HH:mm"),
    width: 150,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DashboardTable() {
  const { dashboard } = React.useContext(AppContext);

  const rows = React.useMemo(
    () =>
      dashboard.client_summary.map((summary) => ({
        ...summary,
      })),
    [dashboard.client_summary]
  );

  return (
    <Paper
      sx={{
        flex: 1,
        width: "100%",
        boxShadow: "0 14px 26px rgba(0, 0, 0, 0.04)",
        border: "1px solid #55555522",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel },
          sorting: { sortModel: [{ field: "total_checkins", sort: "desc" }] },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
