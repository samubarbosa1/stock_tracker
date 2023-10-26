import {Typography, TextField, MenuItem, Paper, Box } from "@mui/material";
import { useState } from "react";

export default function StockSelectionPaper() {
  const [stock,setStock] = useState("EUR");
  const [minValue,setMinValue] = useState("")
  const [maxValue,setMaxValue] = useState("")

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
      <Box sx={{display:"flex", flexDirection:"row"}}>
        <Typography variant="h6" sx={{mr:1, position:"relative", bottom:"0.1rem"}}>Ação:</Typography>
        <TextField
          id="Stocker-Selector"
          select
          helperText="Selecione a ação da B3"
          variant="standard"
          value={stock}
          onChange={(e)=>{setStock(e.target.value)}}
        >
          {stocks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row"}}>
        <Typography variant="h6" sx={{mr:1, position:"relative", }}>Valor Mínimo:</Typography>
        <TextField 
          id="bottom-value" 
          helperText="Exemplo: 5,50"
          variant="standard"
          value={minValue}
          onChange={(e) =>{setMinValue(e.target.value)}}
          sx={{maxWidth:'50%'}}
        />
      </Box>
      <Box sx={{display:"flex", flexDirection:"row"}}>
        <Typography variant="h6" sx={{mr:1, position:"relative",}}>Valor Máximo:</Typography>
        <TextField 
          id="top-value" 
          helperText="Exemplo: 40,10"
          variant="standard"
          value={maxValue}
          onChange={(e) =>{setMaxValue(e.target.value)}}
        />
      </Box>
    </Paper>
  );
}
