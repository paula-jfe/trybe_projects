/* https://economia.awesomeapi.com.br/json/all */

const AWESOME_API_CURRENCIES = 'https://economia.awesomeapi.com.br';

const getCurrencies = async () => {
  const currenciesRequest = await fetch(`${AWESOME_API_CURRENCIES}/json/all`);
  const currenciesJson = await currenciesRequest.json();
  return currenciesJson;
};

export default getCurrencies;
