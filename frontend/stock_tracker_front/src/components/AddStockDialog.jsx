import {Typography, TextField, MenuItem, Paper, Box, Button, CircularProgress, LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText} from "@mui/material";
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{mx:'auto'}}>Adicione a ação a ser monitorada</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{display:"flex", flexDirection:"row", mb:2}}>
            <Typography  sx={{mr:1, position:"relative", top:"0.2rem"}}>Ação:</Typography>
            <TextField
              id="Stock"
              name="stock"
              helperText="Selecione a ação da B3"
              variant="standard"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{display:"flex", flexDirection:"row", my:2}}>
            <Typography  sx={{mr:1, position:"relative", top:"0.2rem" }}>Valor Mínimo:</Typography>
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
          <Box sx={{display:"flex", flexDirection:"row", my:2}}>
            <Typography  sx={{mr:1, position:"relative", top:"0.2rem"}}>Valor Máximo:</Typography>
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
          </DialogContent>
      </form>
    </Dialog>
  );
}

