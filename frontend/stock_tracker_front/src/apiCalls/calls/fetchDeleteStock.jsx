/**
 * Deleta uma ação pelo nome
 * @param  {string} stockName - Nome da ação a ser deletada
 */
function fetchDeleteStock(stockName) {
    const url = `http://localhost:8000/delete_stock`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stock: stockName,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ocorreu um erro.');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  export default fetchDeleteStock;
  