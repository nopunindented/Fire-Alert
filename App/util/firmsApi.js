import axios from 'axios';

const FIRMS_MAP_KEY = "832b6eef2f6837122b1999958dddac1e";

export const fetchNASAData = async (lat, lng) => {
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/${lng-10},${lat-10},${lng+10},${lat+10}/1/2023-10-07`;
    console.log(url)
  try {
    const response = await axios.get(url);
    const dataArray = [];
        const lines = response.data.trim().split('\n');

        const headers = lines.shift().split(',');

        lines.forEach((line) => {
          const values = line.split(',');
          const entry = {};

          dataArray.push([values[0], values[1]]);
        });

    return [headers, dataArray];
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
