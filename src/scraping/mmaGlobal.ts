import puppeteer from 'puppeteer';
import { Events } from '../models/Events';
import { AppDataSource } from '../config/typeorm';
import insertData from './insertData';


const mmaGlobal = async (url: string) => {
  const browser = await puppeteer.launch({ headless: 'new', });
  const page = await browser.newPage();
  await page.goto(url, { timeout: 0 });
  const allEvents = await page.evaluate(() => {
    let articles = document.querySelectorAll(".row > .buffer-bottom-small");
    return Array.from(articles).map((article) => {
      const title = (<HTMLInputElement | null>article.querySelector('div > h4 > a'))?.innerText;
      const url = (<HTMLAnchorElement | null>article.querySelector('div a'))?.href;
      const imgSrc = (<HTMLInputElement | null>article.querySelector('div a img'))?.src;
      const eventDate = (<HTMLInputElement | null>article.querySelector('span.date-display-single'))?.innerText;
      return { title, url, imgSrc, eventDate }
    });
  });
  insertData(Events, allEvents);
};
export default mmaGlobal 