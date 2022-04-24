export const getCurrencies = async () => {
  const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  return Object.keys(data);
};

export const convertValue = async (value, currency, convertTo) => {
  const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  data.BRL = { ask: '1' };
  data.BTC.ask *= 1000;
  return {
    convertedValue: value * (data[currency].ask / data[convertTo].ask),
    convertionRatio: (data[currency].ask / data[convertTo].ask),
  };
};
