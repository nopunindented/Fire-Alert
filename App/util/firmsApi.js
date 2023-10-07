import axios from 'axios';

const FIRMS_MAP_KEY = "832b6eef2f6837122b1999958dddac1e";

export const fetchNASAData = async () => {
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/world/1/2023-10-07`;

  try {
    const response = await axios.get(url);

    console.log('Response data:', response.data);


    const dataArray = [];
        const lines = response.data.trim().split('\n');

        // Get the headers from the first line
        const headers = lines.shift().split(',');

        // Parse the remaining lines
        lines.forEach((line) => {
          const values = line.split(',');
          const entry = {};

          // Create an object using headers as keys and values as values
          headers.forEach((header, index) => {
            entry[header] = values[index];
          });

          dataArray.push(entry);
        });

        console.log('Parsed data array:', dataArray);

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
