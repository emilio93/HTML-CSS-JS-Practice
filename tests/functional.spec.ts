import { test, expect } from '@playwright/test';
import * as path from 'path';

const URL = `file:///${path.dirname(__dirname)}/index.html`;
const CHECKBOX_QTY = 4;
const ROWS_TO_INSERT = 20;

const emails = ['juan@gmail.com', 'pedro@gmail.com', 'luis@gmail.com', 'gerardo@gmail.com', 'miguel@gmail.com'];
const names = ['juan', 'miguel','luisa', 'daniela', 'pablo', 'oscar'];

const submitRandomValues = async (page) => {
  const randomValues = {
    email: emails[Math.floor(Math.random()*emails.length)],
    name: names[Math.floor(Math.random()*names.length)],
    country: Math.floor(Math.random()*200),
    gender: Math.floor(Math.random()*3),
    hobby: [],
    date: {
      day:Math.ceil(Math.random()*28),
      month:Math.ceil(Math.random()*12),
      year:Math.ceil(Math.random()*(2020-1980)+1980),
    }
  };

  await page.fill('#email', randomValues.email);
  await page.fill('#name', randomValues.name);
  const date = randomValues.date;
  const dateStr = `${date.year}-${date.month<10?'0':''}${date.month}-${date.day<10?'0':''}${date.day}`
  await page.fill('#birthdate', dateStr);
  await page.selectOption('#country', `${randomValues.country}`);
  await page.check(`#gender${randomValues.gender}`);
  for (let index = 0; index < CHECKBOX_QTY; index++) {
    if (Math.round(Math.random())){
      await page.check(`#hobby${index}`);
      randomValues.hobby.push(true);
    } else {
      randomValues.hobby.push(false);
    }
  }

  await page.click('#registerButton');
};

test('basic test', async ({ page }) => {
  await page.goto(URL);
  for (let index = 0; index < ROWS_TO_INSERT; index++) {
    await submitRandomValues(page);
  }
  await page.screenshot({ path: `screenshot.png`, fullPage: true });
});
