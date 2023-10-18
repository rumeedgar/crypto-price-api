const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

async function getPriceFeed() {
  try {
    const siteUrl = "https://coinmarketcap.com/";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);
    const elmSelector =
      "#__next > div.sc-faa5ca00-1.cKgcaj.global-layout-v2 > div.main-content > div.cmc-body-wrapper > div > div:nth-child(1) > div.sc-66133f36-2.cgmess > table > tbody > tr";

    const keys = [
      "rank",
      "name",
      "price",
      "1h",
      "24h",
      "7d",
      "marketCap",
      "volume",
      "circulatingSupply",
    ];

    $(elmSelector).each((parentIdx, parentElem) => {
      let keyIdx = 0;
      const coinObj = {};

      if (parentIdx <= 9) {
        $(parentElem)
          .children()
          .each((childIdx, childElem) => {
            let tdValue = $(childElem).text();

            if (keyIdx === 1 || keyIdx === 7) {
              console.log($("p:first-child", $(childElem).html()).text());
            }

            if (tdValue) {
              coinObj[keys[keyIdx]] = tdValue;
              keyIdx++;
            }
          });
        // console.log(coinObj);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

getPriceFeed();
