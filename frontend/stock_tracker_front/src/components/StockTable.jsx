import { useState, useEffect } from "react";
import fetchStocks from "../apiCalls/calls/fetchStocks";
import StockTableRow from "./StockTableRow";
import {Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddStockDialog from "./AddStockDialog";

export default function StockTable() {
    const [isLoading, setIsLoading] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    useEffect(() => {
        fetchStocks(setStocks, setIsLoading);
    },[]);

    const handleOpenAddDialog = ()=>{
        setOpenAddDialog(true);
    }
    const handleCloseAddDialog = ()=>{
        setOpenAddDialog(false);
    }
    return (
        <>
            <Box display="flex">
                <IconButton sx={{ml:'auto'}} ml='auto' onClick={handleOpenAddDialog}>
                    <AddIcon sx={{ml:'auto'}}/>
                </IconButton>
            </Box>
            <TableContainer sx={{maxHeight:400}} component={Paper}>
            <Table variant="soft" borderAxis="bothBetween">
                <TableHead>
                <TableRow>
                    <TableCell>Ação</TableCell>
                    <TableCell>Valor Mínimo</TableCell>
                    <TableCell>Valor Atual</TableCell>
                    <TableCell>Valor Máximo</TableCell>
                    <TableCell>Opções</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {stocks.map((stock) => (
                    <StockTableRow stock={stock}/>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <AddStockDialog open={openAddDialog} handleClose={handleCloseAddDialog} />
            
        </>
    );
}