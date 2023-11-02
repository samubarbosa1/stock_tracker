import { TableCell, TableHead, TableRow } from "@mui/material";
import { useState, useEffect } from "react";

export default function StockTableRow(stock) {
    const [minPrice,setMinPrice] = useState(stock.stock.min_price);
    const [price,setPrice] = useState(stock.stock.price);
    const [maxPrice,setMaxPrice] = useState(stock.stock.max_price);

    return (
                <TableRow key={stock.stock.name}>
                    <TableCell>{stock.stock.name}</TableCell>
                    <TableCell>{minPrice}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{maxPrice}</TableCell>
                </TableRow>
    )
}