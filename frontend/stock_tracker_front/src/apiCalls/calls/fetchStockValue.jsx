/**
 * Obtém o valor atual de uma ação
 * @param  {string} stock - Nome da ação a ser registrada
 * @param  {function} setStockCurrentValue - Função para setar o valor da ação
 */
function fetchStockValue(
    stock,
    setStockCurrentValue,
  ) {
    const url = `http://localhost:8000/get_stock_current_value?stock=${stock}.sa`;
    fetch(url,{
      method: "GET",
      headers: { "Content-Type":"application/json" },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocorreu um erro.');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.data.value)
            setStockCurrentValue(data.data.value)
        })
        .catch((error) => {
            console.error(error);
            setStockCurrentValue('');
        });
  }
  
  export default fetchStockValue;