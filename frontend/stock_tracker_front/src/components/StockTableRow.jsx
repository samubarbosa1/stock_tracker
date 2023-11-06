import { IconButton, TableCell, TextField, TableRow, Tooltip } from "@mui/material";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import fetchDeleteStock from "../apiCalls/calls/fetchDeleteStock";
import fetchStockRegister from "../apiCalls/calls/fetchStockRegister";

export default function StockTableRow(stock) {
    const [change, setChange] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const [formData, setFormData] = useState({
        stock: stock.stock.name,
        minPrice: stock.stock.min_price,
        maxPrice: stock.stock.max_price,
        price: stock.stock.price,
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setChange(false);
    };
    const handleSave = () => {
        fetchStockRegister(
            formData.stock,
            formData.minPrice,
            formData.maxPrice,
            setIsLoading
        );
        setChange(true);
    }

    const handleDelete = () => {
        fetchDeleteStock(formData.stock);
    }
    return (
                <TableRow key={stock.stock.name}>
                    <TableCell>
                        <TextField
                            id="stock"
                            name="stock"
                            variant="standard"
                            value={formData.stock}
                            onChange={handleInputChange}
                            />
                    </TableCell>
                    <TableCell>
                        <TextField 
                            id="minPrice"
                            name="minPrice" 
                            variant="standard"
                            value={formData.minPrice}
                            onChange={handleInputChange}
                            sx={{maxWidth:'50%'}}
                            />
                    </TableCell>
                    <TableCell sx={{fontSize:16}}>{formData.price}</TableCell>
                    <TableCell>
                        <TextField 
                            id="maxPrice"
                            name="maxPrice" 
                            variant="standard"
                            value={formData.maxPrice}
                            onChange={handleInputChange}
                            sx={{maxWidth:'50%'}}
                            />
                    </TableCell>
                    <TableCell sx={{display:'flex', flexDirection:'row'}}>
                        <Tooltip title="Salvar">
                            <span>
                                <IconButton onClick={handleSave} disabled={change}>
                                    <SaveIcon/>
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Deletar">
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
    )
}