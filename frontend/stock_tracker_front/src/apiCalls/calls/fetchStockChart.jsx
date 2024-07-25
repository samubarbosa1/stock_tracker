/**
 * Obtém as informações das ações
 * @param  {function} setChartData - Função para setar o valor dos históricos da ação
 * @param  {string} symbol - simbolo da ação 
 */
function fetchStockChart({ setChartData, symbol }) {
    const url = `http://localhost:8000/get_stock_historical?stock=${symbol}&period=1mo`;
  
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Ensure response is parsed as JSON
      .then((data) => {
        console.log(data);  // Log the data to verify its structure
        setChartData({
          dates: data.dates.map(date => new Date(date)),  // Ensure dates are Date objects
          prices: data.prices,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the stock data!", error);
      });
  }
  
  export default fetchStockChart;