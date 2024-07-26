import { useState, useEffect } from "react";
import fetchStocks from "../apiCalls/calls/fetchStocks";
import {
    TextField,
    IconButton,
    Grid,
    Paper,
    Tooltip,
    MenuItem
} from "@mui/material";
import StockChart from './StockChart';
import SearchIcon from '@mui/icons-material/Search';


const periods = [
    {
      value: '1mo',
      label: '1 mês',
    },
    {
      value: '3mo',
      label: '3 meses',
    },
    {
      value: '6mo',
      label: '6 meses',
    },
  ];

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [symbol, setSymbol] = useState('PETR4.SA');
    const [inputSymbol, setInputSymbol] = useState('PETR4.SA');
    const [inputPeriod, setInputPeriod] = useState('1mo');
    const [period, setPeriod] = useState('1mo');


    useEffect(() => {
        fetchStocks(setStocks, setIsLoading, setRefresh);
        console.log(stocks);
    },[refresh]);

    const handleInputChange = (e) => {
        setInputSymbol(e.target.value);
    };

    const handleSearch = () => {
        setSymbol(inputSymbol);
        setPeriod(inputPeriod);
    };

    const handlePeriodChange = (event) => {
        setInputPeriod(event.target.value);
    };
    return (
        <Paper>
            <Grid container padding={2} spacing={2}>
                <Grid item xs={12} sx={{my:0}}>
                    <TextField
                        id='name'
                        label="Ação"
                        select
                        defaultValue="PETR4.SA"
                        onChange={handleInputChange}
                        helperText="Selecione a ação."
                    >
                        {stocks.map((option) => (
                            <MenuItem key={option.name} value={option.name} >
                            {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="period"
                        select
                        label="Período"
                        defaultValue="1mo"
                        helperText="Selecione o período."
                        onChange={handlePeriodChange}
                        >
                        {periods.map((option) => (
                            <MenuItem key={option.value} value={option.value} >
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Tooltip label="Pesquisar">
                        <IconButton size="large" onClick={handleSearch}>
                            <SearchIcon fontSize="inherit"  />
                        </IconButton>
                    </Tooltip>
                </Grid>
            <Grid item sm={12}>
                <StockChart symbol={symbol} period={period} />
            </Grid>
            </Grid>

        </Paper>
    );
}