import { test, expect } from "@playwright/test";
import * as path from "path";

const URL = `file:///${path.dirname(__dirname)}/src/index.html`;
const CHECKBOX_QTY = 4;
const ROWS_TO_INSERT = 30;

const emails = [
  "juan@gmail.com",
  "pedro@gmail.com",
  "luis@gmail.com",
  "gerardo@gmail.com",
  "miguel@gmail.com",
];
const names = ["juan", "miguel", "luisa", "daniela", "pablo", "oscar"];

const randomBool = () => (Math.round(Math.random()) === 0 ? false : true);

const submitRandomValues = async (page) => {
  const randomValues = {
    email: randomBool() ? emails[Math.floor(Math.random() * emails.length)] : "",
    name: randomBool() ? names[Math.floor(Math.random() * names.length)] : "",
    country: randomBool() ? Math.floor(Math.random() * 200) : "",
    gender: randomBool() ? Math.floor(Math.random() * 3) : "",
    hobby: [],
    date: randomBool() ? {
      day: Math.ceil(Math.random() * 28),
      month: Math.ceil(Math.random() * 12),
      year: Math.ceil(Math.random() * (2020 - 1980) + 1980),
    } : null,
  };

  await page.fill("#email", randomValues.email);
  await page.fill("#name", randomValues.name);

  const date = randomValues.date;
  if (date !== null) {
    const dateStr = `${date.year}-${date.month < 10 ? "0" : ""}${date.month}-${date.day < 10 ? "0" : ""}${date.day}`;
    await page.fill("#birthdate", dateStr);
  }

  await page.selectOption("#country", `${randomValues.country}`);
  if (randomValues.gender !== "") await page.check(`#gender${randomValues.gender}`);
  for (let index = 0; index < CHECKBOX_QTY; index++) {
    if (randomBool()) {
      await page.check(`#hobby${index}`);
      randomValues.hobby.push(true);
    } else {
      randomValues.hobby.push(false);
    }
  }
  await page.click("#registerButton");
  return randomValues;
};

test("basic test", async ({ page }) => {
  await page.goto(URL);
  const randomValues = [];
  for (let index = 0; index < ROWS_TO_INSERT; index++) {
    const randomValuesRow = await submitRandomValues(page);
    randomValues.push(randomValuesRow);
  }
  const rows = await page.$$(".user-table-row");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = await row.$$(".user-table-row-cell");

    ["email", "name"].forEach(async (key, index) => {
      const html = await cells[index].innerText();
      expect(html).toEqual(randomValues[i][key]);
    });
  }
  await page.screenshot({ path: `screenshot.png`, fullPage: true });
});
