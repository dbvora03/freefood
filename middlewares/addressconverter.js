
const axios = require("axios");
const API_KEY = process.env.GOOGLE_API_KEY ;



// DONT NEED THIS ANYMORE

async function getCoordsForAddress(address) {
    // return {
    //   lat: 40.7484474,
    //   lng: -73.9871516
    // };
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );
  
    const data = response.data;
  
    if (!data || data.status === 'ZERO_RESULTS') {
      throw console.error(err);
    }

  
    const coordinates = data.results[0].geometry.location;
    console.log(coordinates)
    return coordinates;
  }

  
  module.exports = getCoordsForAddress;