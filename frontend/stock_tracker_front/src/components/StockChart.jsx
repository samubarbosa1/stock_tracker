import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import fetchStockChart from '../apiCalls/calls/fetchStockChart';

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchStockChart({
      setChartData: (data) => {
        setChartData({
            dates: data.dates,
            prices: data.prices
        });
        setLoading(false);
      },
      symbol,
    }).catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, [symbol]);

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
            series={[
            {data: chartData.prices},
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
