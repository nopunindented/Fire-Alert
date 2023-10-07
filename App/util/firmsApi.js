import axios from 'axios';

const FIRMS_MAP_KEY = "832b6eef2f6837122b1999958dddac1e";

export const fetchNASAData = async () => {
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/world/1/2023-10-07`;

  try {
    const response = await axios.get(url);
    const dataArray = [];
        const lines = response.data.trim().split('\n');

        const headers = lines.shift().split(',');

        lines.forEach((line) => {
          const values = line.split(',');
          const entry = {};

          dataArray.push(values);
        });

    return [headers, dataArray];
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
