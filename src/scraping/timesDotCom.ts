import { Category } from "../models/Category";
import { City } from "../models/City";
import { Country } from "../models/Country";
import { Events } from "../models/Events";
import insertData from "./insertData";
const puppeteer = require('puppeteer');

function extractItems() {
  const extractedElements = document.querySelectorAll('#content .row');
  const items = [];

  for (let element of extractedElements) {

    const title = (<HTMLInputElement | null>element.querySelector('td h2 a'))?.innerText;
    const url = (<HTMLAnchorElement | null>element.querySelector('div a'))?.href;
    const imgSrc = (<HTMLInputElement | null>element.querySelector('td h2  a span img'))?.src;
    const eventDate = (<HTMLInputElement | null>element.querySelector('td div'))?.innerText;
    const description = (<HTMLInputElement | null>element.querySelector('td div .small'))?.innerText;
    const city = element.querySelectorAll('.text-dark')[1]?.innerHTML;
    const country = element.querySelectorAll('.text-dark')[2]?.innerHTML;
    const loopCategory = element.querySelectorAll('.d-inline-block.small.me-2.p-1.lh-1.bg-light.rounded-1');

    const slideCategory = [];
    for (const loop of loopCategory) {
      var html = loop.innerHTML;
      var parser = new DOMParser();
      var htmlDoc = parser?.parseFromString(html, 'text/html')?.querySelector('a')?.textContent;
      slideCategory.push(htmlDoc);
    }
    const category = slideCategory.toString();
    items.push({ title, url, imgSrc, eventDate, description, city, country, category });
  }
  return items;
}

function extractCategoryItems() {
  const extractedElements = document.querySelectorAll('#content .row');
  const slideCategory = [];
  for (let element of extractedElements) {
    const loopCategory = element.querySelectorAll('.d-inline-block.small.me-2.p-1.lh-1.bg-light.rounded-1');
    for (const loop of loopCategory) {
      var html = loop.innerHTML;
      var parser = new DOMParser();
      var name = parser?.parseFromString(html, 'text/html')?.querySelector('a')?.textContent;
      if (name !== null)
        slideCategory.push({ name });
    }
  }
  return slideCategory;
}

function extractCityItems() {
  const extractedElements = document.querySelectorAll('#content .row');
  const slideCity = [];
  for (let element of extractedElements) {
    const city = element.querySelectorAll('.text-dark')[1]?.innerHTML;
    const country = element.querySelectorAll('.text-dark')[2]?.innerHTML;
    slideCity.push({ name: city, country: country });
  }
  return slideCity;
}

function extractCountryItems() {
  const extractedElements = document.querySelectorAll('#content .row');
  const slideCountry = [];
  for (let element of extractedElements) {
    const country = element.querySelectorAll('.text-dark')[2]?.innerHTML;
    slideCountry.push({ name: country });
  }
  return slideCountry;
}

async function scrapeItems(
  page: any,
  extractItems: any,
  itemCount: any,
  scrollDelay = 10000,
) {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemCount) {
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitForTimeout(scrollDelay);
    }
  } catch (e) { }
  return items;
}

const timesDotCom = async (url: string) => {
  const browser = await puppeteer.launch({ headless: 'new', });
  const page = await browser.newPage();
  await page.goto(url, { timeout: 0 });

  // Inserting the events information into events table
  const items = await scrapeItems(page, extractItems, 5000);
  insertData(Events, items);

  // Inserting the Category information into Category table
  const itemCategory = await scrapeItems(page, extractCategoryItems, 5000);
  insertData(Category, itemCategory);

  // Inserting the city information into city table
  const itemCity = await scrapeItems(page, extractCityItems, 5000);
  insertData(City, itemCity);

  // Inserting the country information into country table
  const itemCountry = await scrapeItems(page, extractCountryItems, 5000);
  insertData(Country, itemCountry);


};

export default timesDotCom;