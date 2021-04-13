const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const url =
  "https://clubetorrent.com/jovem-sheldon-young-sheldon-4-temporada-legendada-torrent-download/";

const targetSelector = "a.text-center.newdawn.btn.btn-successs";

async function getTorrents() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  page.once("load", () => console.log("Page loaded!!!"));

  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll(targetSelector), (a) =>
      a.getAttribute("href")
    )
  );

  const sanitizedAnchors = anchors.map((link) => link.split("&")[0]).join("\n");

  fs.writeFileSync(
    path.resolve(__dirname, "..", "links.txt"),
    sanitizedAnchors
  );

  await browser.close();
}

getTorrents();
