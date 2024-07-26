/**
 * Obtém as informações das ações
 * @param  {function} setChartData - Função para setar o valor dos históricos da ação
 * @param  {string} symbol - simbolo da ação 
 * @param  {string} period - período de análise da ação
 */
function fetchStockChart({ setChartData, symbol, period }) {
    const url = `http://localhost:8000/get_stock_historical?stock=${symbol}&period=${period}`;
  
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  
        setChartData({
          dates: data.dates.map(date => new Date(date)),
          prices: data.prices,
          min_values: data.min_values,
          max_values: data.max_values
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the stock data!", error);
      });
  }
  
  export default fetchStockChart;