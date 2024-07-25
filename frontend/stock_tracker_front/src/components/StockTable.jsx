import { useState, useEffect } from "react";
import fetchStocks from "../apiCalls/calls/fetchStocks";
import StockTableRow from "./StockTableRow";
import {
    Box, 
    Tooltip, 
    IconButton, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField,
    Container, 
    Button
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddStockDialog from "./AddStockDialog";
import StockChart from './StockChart';

export default function StockTable() {
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    useEffect(() => {
        fetchStocks(setStocks, setIsLoading, setRefresh);
        console.log(stocks);
    },[refresh]);


    const handleOpenAddDialog = ()=>{
        setOpenAddDialog(true);
    }
    const handleCloseAddDialog = ()=>{
        setOpenAddDialog(false);
    }
    return (
        <>
            <Box display="flex">
                <Tooltip title="Adicionar ação">
                    <IconButton sx={{ml:'auto'}} ml='auto' onClick={handleOpenAddDialog}>
                        <AddIcon sx={{ml:'auto'}}/>
                    </IconButton>
                </Tooltip>
            </Box>
            <TableContainer sx={{maxHeight:400, backgroundColor:'#Dcdcdf'}} component={Paper}>
            <Table variant="soft" borderAxis="bothBetween">
                <TableHead>
                <TableRow>
                    <TableCell>Ação</TableCell>
                    <TableCell>Valor Mínimo</TableCell>
                    <TableCell>Valor Atual</TableCell>
                    <TableCell>Valor Máximo</TableCell>
                    <TableCell>Período</TableCell>
                    <TableCell>Opções</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {stocks.map((stock) => (
                    <StockTableRow key={stock.name} stock={stock} setRefresh={setRefresh}/>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <AddStockDialog open={openAddDialog} handleClose={handleCloseAddDialog} setRefresh={setRefresh} />
            
        </>
    );
}