import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import StockSelectionPaper from "../components/StockSelectionPaper";

export default function HomePage() {
  return (
    <Grid container padding={9} spacing={15}>
      <Grid item xs={12} md={5}>
        <Typography marginBottom={2} variant="h2">
          Monitore as suas ações
        </Typography>
        <Typography variant="text">
          Acompanhe a suas ações por meio do nosso sistema de monitoramento
          diário e seja informado sempre que a sua ação mudar.
        </Typography>
      </Grid>
      <Grid item xs={12} md={7}>
        <StockSelectionPaper />
      </Grid>
    </Grid>
  );
}
