const fs = require('fs');
const fetch = require('node-fetch');
const data = require('./data.json');
const {googleMapsKey} = require('./googleMapsKey.json');

/*
  classList
  name
  image
  website
  tags
  address
  description
  firstCourse
  secondCourse
  thirdCourse
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateOutput() {
  let output = {}

  output.totalCount = data.data.pdxdm.numberOfRestaurants;

  const test = [data.data.pdxdm.restaurants[5]]
  console.log(test.length)

  output.restaurants = [];
  
  for (let restaurant of data.data.pdxdm.restaurants) {
  // test.forEach(async (restaurant) => {
    let result = {};
  
    result.classList = restaurant.classList;
    result.name = restaurant.name.text.trim();
    result.image = restaurant.image.text.trim();
    result.website = restaurant.website.text ? restaurant.website.text.trim() : null;
    result.tags = restaurant.tags.text.trim();
    result.address = restaurant.address.text.trim();
    result.description = restaurant.description.text.trim();
    result.firstCourse = restaurant.firstCourse.text.trim().split('-or-');
    result.secondCourse = restaurant.secondCourse.text.trim().split('-or-');
    result.thirdCourse = restaurant.thirdCourse.text.trim().split('-or-');
  
    result.tags = result.tags.split(' • ');

    console.log(`${result.address}:`)

    let urlAddress = result.address.replace(/\s/g, '+');
    urlAddress = urlAddress.replace(/\./g, '');

    // console.log(`https://nominatim.openstreetmap.org/search?format=json&q=${urlAddress}`)
    console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${googleMapsKey}`);
    
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${googleMapsKey}`);
    let json = await res.json();

    const location = json.results[0].geometry.location;

    if (location.lat === undefined || location.lng === undefined) {
      throw new Error('Error getting coords');
    }

    result.coords = {
      lat: location.lat,
      lng: location.lng
    };

    // await Promise.all(output.restaurants);
    // console.log(result);

    // output.restaurants.push(result);

    await sleep(250);

    // return result;
    output.restaurants.push(result);
  };

  await Promise.all(output.restaurants)

  // console.log(`output length: ${output.length}`)
  return output;
}

function checkOutput() {
  const data = require('./restaurantData.json');
  const {totalCount, restaurants} = data;

  if (totalCount === restaurants.length) {
    console.log('Data is good!');
  } else {
    console.error(`Data bad! Was expecting ${totalCount} restaurants, but found ${restaurants.length}`);
  }
}

generateOutput().then((output) => {
  console.log('All done!');
  // console.log(output.restaurants[0]);
  fs.writeFileSync(`${__dirname}/restaurantData.json`, JSON.stringify(output));
  checkOutput();
});
