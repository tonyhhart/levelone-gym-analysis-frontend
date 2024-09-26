import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Alert, Stack, TextField } from "@mui/material";
import { AppContext } from "../AppContextProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  PaperShadow: 24,
  p: 4,
};

export default function ImportModalButton() {
  const { submitCSV } = React.useContext(AppContext);

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const file = useWatch({ control, name: "file" });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    setError(undefined);
    try {
      await submitCSV(data);
      handleClose();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Importar Dados
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Paper sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {!!error && <Alert severity="error">{error}</Alert>}

              <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  Importar Dados
                </Typography>

                <Typography>Selecione o arquivo CSV:</Typography>
              </Box>

              <Controller
                name="file"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <TextField
                    {...field}
                    value={value?.fileName}
                    onChange={(event) => onChange(event.target.files[0])}
                    type="file"
                    label
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || !file}
              >
                Enviar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Modal>
    </>
  );
}
