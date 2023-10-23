import { Grid, Typography, TextField, MenuItem, Paper } from "@mui/material";

export default function StockSelectionPaper() {
  const stocks = [
    {
      value: "CIEL3",
      label: "CIEL3",
    },
    {
      value: "PETR4",
      label: "PETR4",
    },
    {
      value: "B3SA3",
      label: "B3SA3",
    },
    {
      value: "RAIZ4",
      label: "RAIZ4",
    },
  ];
  return (
    <Paper sx={{ p: 6 }}>
      <TextField
        id="filled-select-currency"
        select
        label="Select"
        defaultValue="EUR"
        helperText="Selecione a ação da B3"
        variant="filled"
      >
        {stocks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
  );
}
