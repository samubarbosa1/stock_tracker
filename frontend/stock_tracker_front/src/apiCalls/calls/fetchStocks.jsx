/**
 * Obtém as informações das ações
 * @param  {function} setStocks - Função para setar o valor das ações
 * @param  {function} setIsLoading - Função para setar se a call está sendo processada
 */
function fetchStocks(
    setStocks,
    setIsLoading,
  ) {
    setIsLoading(true);
    const url = `http://localhost:8000/get_stocks`;
    fetch(url,{
      method: "GET",
      headers: { "Content-Type":"application/json" },
    })
        .then(response => {
            setIsLoading(false);
            if (!response.ok) {
                throw new Error('Ocorreu um erro.');
            }
            return response.json();
        })
        .then((data) => {
            setStocks(data.stocks);
        })
        .catch((error) => {
            console.error(error);
        });
  }

  export default fetchStocks;