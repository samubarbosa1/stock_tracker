import {Typography, TextField, MenuItem, Paper, Box, Button, CircularProgress, LinearProgress, Dialog} from "@mui/material";
import { useState, useEffect } from "react";
import fetchStockRegister from "../apiCalls/calls/fetchStockRegister";
import fetchStockValue from "../apiCalls/calls/fetchStockValue";

export default function AddStockDialog({open, handleClose}) {
  const [isLoading, setIsLoading] = useState(false);
  const [stockCurrentValue, setStockCurrentValue] = useState('')

  const [formData, setFormData] = useState({
    stock: '',
    minValue: '',
    maxValue: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetchStockRegister(formData.stock,
      formData.minValue,
      formData.maxValue,
      setIsLoading
      );
  };

  useEffect(() => {
    fetchStockValue(formData.stock,setStockCurrentValue);
  }, [formData.stock])

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 6 }}>
          <Box sx={{display:"flex", flexDirection:"row"}}>
            <Typography variant="h6" sx={{mr:1, position:"relative", bottom:"0.1rem"}}>Ação:</Typography>
            <TextField
              id="Stock"
              name="stock"
              helperText="Selecione a ação da B3"
              variant="standard"
              value={formData.stock}
              onChange={handleInputChange}
            >
            </TextField>
            <Typography variant="h6" ml={5}>Valor Atual (R$): {stockCurrentValue}</Typography>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row"}}>
            <Typography variant="h6" sx={{mr:1, position:"relative", }}>Valor Mínimo:</Typography>
            <TextField 
              id="minValue"
              name="minValue" 
              helperText="Exemplo: 5.50"
              variant="standard"
              value={formData.minValue}
              onChange={handleInputChange}
              sx={{maxWidth:'50%'}}
            />
          </Box>
          <Box sx={{display:"flex", flexDirection:"row"}}>
            <Typography variant="h6" sx={{mr:1, position:"relative",}}>Valor Máximo:</Typography>
            <TextField 
              id="maxValue"
              name="maxValue" 
              helperText="Exemplo: 40.10"
              variant="standard"
              value={formData.maxValue}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{display:"flex", flexDirection:"column"}}>
            <Button variant="contained" type="submit" disabled={isLoading} sx={{marginX:"auto"}}> 
              Monitorar
            </Button>
          </Box>
        </Paper>
      </form>
    </Dialog>
  );
}

