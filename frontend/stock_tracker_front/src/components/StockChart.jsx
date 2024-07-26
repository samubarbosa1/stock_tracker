import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
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
            maxValues: data.max_values
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
          <Typography variant="h6">Loading...</Typography>
          <CircularProgress />
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
        <Typography variant="h6">Preço da Ação {`${symbol}`.toUpperCase()}</Typography>
        <LineChart
            width={600}
            height={400}
            yAxis={[{ min: Math.min(...chartData.prices)*0.95, max: Math.max(...chartData.prices)*1.05}]}
            series={[
            {id: 'prices',  showMark: false, label:'Preço', data: chartData.prices},
            {id: 'minValue', showMark: false, label:'Valor Mínimo', data: chartData.minValues},
            {id: 'maxValue', showMark: false, label:'Valor Máximo', data: chartData.maxValues}
            ]}
            xAxis={[{ 
                data: chartData.dates,
                scaleType: 'time'
            }]}
        />
      </CardContent>
    </Card>
  );
};

export default StockChart;
