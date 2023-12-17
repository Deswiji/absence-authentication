const { default: axios } = require('axios');

const getDataCoordinate = async () => {
  const URL = 'https://api.ipgeolocation.io/ipgeo';
  const dataPrivate = await axios.get(
    `${URL}?apiKey=${process.env.API_KEY_GEO}`,
  );
  return dataPrivate?.data;
};

module.exports = {
  getDataCoordinate,
};
