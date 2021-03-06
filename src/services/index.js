export const getCurrencies = async () => {
  const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  return Object.keys(data);
};

export const convertValue = async (id, description, tag, method, value, currency, convertTo) => {
  const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  data.BRL = { ask: '1' };
  data.BTC.ask *= 1000;
  return {
    id,
    description,
    tag,
    method,
    value,
    currency,
    convertTo,
    convertedValue: (value * (data[currency].ask / data[convertTo].ask)).toFixed(2),
    convertionRatio: (data[currency].ask / data[convertTo].ask).toFixed(4),
  };
};
