/**
 * Registra uma ação a ser monitorada no banco de dados.
 * @param  {string} stock - Nome da ação a ser registrada
 * @param  {string} minPrice - valor mínimo da ação
 * @param  {string} maxPrice - valor máximo da ação
 * @param  {function} setIsLoading - Função para setar se a call está sendo processada
 * @param  {function} dispatch - A função dispatch para atualizar a store.
 */
function fetchStockRegister(
    stock,
    minPrice,
    maxPrice,
    period,
    setRefresh,
    setIsLoading
  
  ) {
    const url = "http://localhost:8000/register_stock";
    let stockName = stock.endsWith('.SA') ? stock: stock.toUpperCase().concat('.SA');
    console.log(stockName);
    fetch(url,{
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ stock: stockName, min_price: minPrice, max_price: maxPrice, period: period }),
    })
      .then((response) => {
        setRefresh(true);
        console.log("Ação registrada.");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro.")
        setIsLoading(false);
      });
  }
  
  export default fetchStockRegister;