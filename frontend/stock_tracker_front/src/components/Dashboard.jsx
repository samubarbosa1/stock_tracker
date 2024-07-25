import { useState, useEffect } from "react";
import fetchStocks from "../apiCalls/calls/fetchStocks";
import {
    TextField,
    Container, 
    Button,
    Box,
    Grid,
    Paper
} from "@mui/material";
import StockChart from './StockChart';

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [symbol, setSymbol] = useState('PETR4.SA');
    const [inputSymbol, setInputSymbol] = useState('');

    useEffect(() => {
        fetchStocks(setStocks, setIsLoading, setRefresh);
        console.log(stocks);
    },[refresh]);

    const handleInputChange = (e) => {
        setInputSymbol(e.target.value);
    };

    const handleSearch = () => {
        setSymbol(inputSymbol);
    };
    return (
        <Paper>
            <Grid container padding={2} spacing={2}>
                <Grid item xs={12} sx={{my:0}}>
                    <TextField
                        label="Nome da Ação"
                        value={inputSymbol}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch} sx={{position:'relative', top:'20%'}}>
                        Pesquisar
                    </Button>
                </Grid>
            <Grid item sm={12} md={6}>
                <StockChart symbol={symbol} />

            </Grid>
            </Grid>

        </Paper>
    );
}