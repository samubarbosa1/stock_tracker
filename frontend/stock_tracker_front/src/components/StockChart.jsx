import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import fetchStockChart from '../apiCalls/calls/fetchStockChart';

const StockChart = ({ symbol, period }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchStockChart({
      setChartData: (data) => {
        setChartData({
            dates: data.dates,
            prices: data.prices,
            minValues: data.min_values,
            maxValues: data.max_values,
            belowMinCount: data.belowMinCount,
            aboveMaxCount: data.aboveMaxCount

        });
        setLoading(false);
      },
      symbol,
      period
    }).catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, [symbol, period]);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Grid container padding={1} spacing={1}>
            <Grid item sm={12} md={7}>
               <Typography variant="h6">Preço da Ação {`${symbol}`.toUpperCase()}</Typography>
               <Paper sx={{width:600, height:400, display:"flex", alignItems:'center', flexWrap: 'wrap'}}>
                 <CircularProgress sx={{marginX:"auto"}}/>
                </Paper>
            </Grid>

            <Grid item sm={12} md={5}  >
                <Typography variant="h6">Oportunidades de Compra e Venda {`${symbol}`.toUpperCase()}</Typography>
                <Paper sx={{width:500, height:400, display:"flex", alignItems:'center', flexWrap: 'wrap'}}>
                 <CircularProgress sx={{marginX:"auto"}}/>
                </Paper>
            </Grid>
        </Grid>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!chartData) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">No data available</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Grid container padding={1} spacing={1}>
            <Grid item sm={12} md={7}>
               <Typography variant="h6">Preço da Ação {`${symbol}`.toUpperCase()}</Typography>
                <LineChart
                    width={600}
                    height={400}
                    yAxis={[{ min: Math.min(...chartData.prices)*0.95, max: Math.max(...chartData.prices)*1.05}]}
                    series={[
                    {id: 'prices', label:'Preço', data: chartData.prices},
                    {id: 'minValue', label:'Valor Mínimo', data: chartData.minValues},
                    {id: 'maxValue', label:'Valor Máximo', data: chartData.maxValues}
                    ]}
                    xAxis={[{ 
                        data: chartData.dates,
                        scaleType: 'time'
                    }]}
                />
            </Grid>

            <Grid item sm={12} md={5}  >
                <Typography variant="h6">Oportunidades de Compra e Venda {`${symbol}`.toUpperCase()}</Typography>
                <BarChart
                xAxis={[{  scaleType: 'band', data:["Compra", "Venda"]
                }]}
                series={[
                    { data: [chartData.belowMinCount, chartData.aboveMaxCount] },
                ]}
                width={500}
                height={400}
               />
            </Grid>
        </Grid>
      </CardContent>

    </Card>
  );
};

export default StockChart;
