const BASE_URL = 'https://api.exchangerate.host/latest';

export const getCurrencyFromServer = async () => {
  try {
    const response = await fetch(`${BASE_URL}?base=PLN&symbols=USD,EUR,UAH`);
    const currency = await response.json();

    return currency;
  } catch (error) {
    if ( error && typeof error === 'object') {
      throw new Error('Now you cannot connect the server and get currency');
    } else {
      throw error;
    }
  }
};
