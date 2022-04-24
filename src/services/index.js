export const getCurrencies = async () => {
  const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  return Object.keys(data);
};

export const convertValue = async (value, currency) => {
  const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  return { convertedValue: (data[currency].ask * value), convertionRatio: data[currency].ask };
};
