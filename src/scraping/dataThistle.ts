import puppeteer from 'puppeteer';
import { Events } from '../models/Events';
import { AppDataSource } from '../config/typeorm';
import insertData from './insertData';


const dataThistle = async (url: string) => {
  const browser = await puppeteer.launch({ headless: 'new', });
  const page = await browser.newPage();
  await page.goto(url, { timeout: 0 });
  const allEvents = await page.evaluate(() => {
    let allEventSet = [];

    let articles = document.querySelectorAll(".eventModule > ul > li");

    allEventSet.push(Array.from(articles).map((article) => {
      const title = (<HTMLInputElement | null>article.querySelector('p > strong'))?.innerText;
      const url = article.querySelector('a')?.href;
      const desc = (<HTMLInputElement | null>article.querySelector('span'))?.innerText;
      const imgSrc = (<HTMLInputElement | null>article.querySelector('img'))?.src;
      return { title, url, desc, imgSrc }
    }));

    let newsSet = document.querySelectorAll(".newAbstract");

    allEventSet.push(Array.from(newsSet).map((news) => {
      const title = news.querySelector('h3')?.innerText;
      const url = news.querySelector('a')?.href;
      const description = news.querySelector('h4')?.innerText;
      const imgSrc = news.querySelector('img')?.src;
      const eventDate = news.querySelector('em')?.innerText;
      return { title, url, description, imgSrc, eventDate }
    }));
    return allEventSet;
  });

  insertData(Events, allEvents[0]);

};

export default dataThistle 