# PDX Dining Month 2019

List of restaurants participating in Portland Dining Month 2019 and their options and info.

Data was scraped from https://www.portlanddiningmonth.com using [CoolQLCool](https://coolql.cool/).

Query used to scrape the info:
```graphql
{
  pdxdm: site(url: "https://www.travelportland.com/dining-month/") {
    numberOfRestaurants: count(elem: "#restaurants > div")
    restaurants: selectAll(elem: "#restaurants > div") {
      classList
      name: select(elem: ".restaurant-info > h4") {
        text
      }
      image: select(elem: ".restaurant-thumbnail") {
        text: attr(name: "data-src")
      }
      website: select(elem:".restaurant-info .links > li:nth-of-type(1) > a") {
        text: attr(name: "href")
      }
      tags: select(elem: ".restaurant-info > p") {
        text
      }
      address: select(elem: ".restaurant-info > .meta address") {
        text
      }
      phone: select(elem: ".restaurant-info > .meta .phone") {
        text
      }
      description:select(elem: ".restaurant-header ~ .row .content > p") {
        text
      }
      firstCourse:select(elem: ".restaurant-header ~ .row .content > dl > dd:nth-of-type(1)") {
        text
      }
      secondCourse:select(elem: ".restaurant-header ~ .row .content > dl > dd:nth-of-type(2)") {
        text
      }
      thirdCourse:select(elem: ".restaurant-header ~ .row .content > dl > dd:nth-of-type(3)") {
        text
      }
    }
  }
}

```

Got the coordinates from the restaurant's addresses from [OpenStreetMap's Nominatim API](https://nominatim.openstreetmap.org/).