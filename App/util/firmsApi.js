import axios from 'axios';

const FIRMS_MAP_KEY = "832b6eef2f6837122b1999958dddac1e";
const current = new Date();
const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`

export const fetchNASAData = async () => {
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/world/1/${date}`;

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
