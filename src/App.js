import React, { useContext } from "react";
import { Box, Container, Stack, Typography, Paper } from "@mui/material";

import DashboardTable from "./components/DashboardTable";
import InfoCard from "./components/InfoCard";
import { AppContext } from "./AppContextProvider";
import CheckinsPerDay from "./components/CheckinsPerDay";
import CheckinsPerHour from "./components/CheckinsPerHour";
import ImportModalButton from "./components/ImportModalButton";

function App() {
  const { dashboard } = useContext(AppContext);

  return (
    <Container>
      <Stack direction="column" height="100vh" py={3} spacing={3}>
        <Stack
          spacing={3}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            LEVEL ONE ANALYTICS
          </Typography>

          <ImportModalButton />
        </Stack>

        {Object.values(dashboard).length !== 0 ? (
          <>
            <Stack spacing={3} direction="row">
              <Box flex={1}>
                <InfoCard
                  amount={dashboard.unique_active_clients}
                  title="Clientes Ativos"
                />
              </Box>
              <Box flex={1}>
                <InfoCard
                  amount={dashboard.unique_inactive_clients}
                  title="Clientes Inativos"
                />
              </Box>
              <Box flex={1}>
                <InfoCard
                  amount={Number(
                    dashboard.average_total_checkins_overall
                  ).toFixed(0)}
                  title="Média Checkin"
                />
              </Box>
              <Box flex={1}>
                <InfoCard
                  amount={
                    Number(dashboard.average_duration_overall).toFixed(0) +
                    "min"
                  }
                  title="Média Duração Treino"
                />
              </Box>
            </Stack>

            <Stack spacing={3} direction="row">
              <Box flex={1}>
                <Typography variant="h5" gutterBottom>
                  Checkins Por Dia
                </Typography>
                <CheckinsPerDay />
              </Box>
              <Box flex={1}>
                <Typography variant="h5" gutterBottom>
                  Checkins Por Hora
                </Typography>
                <CheckinsPerHour />
              </Box>
            </Stack>

            <Box display="flex" flex={1}>
              <DashboardTable />
            </Box>
          </>
        ) : (
          <Stack
            spacing={3}
            direction="row"
            height="100%"
            justifyContent="center"
            alignItems="center"
            component={Paper}
            variant="outlined"
          >
            <Typography variant="h5">
              Importe o CSV para visualizar os dados analíticos
            </Typography>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default App;
