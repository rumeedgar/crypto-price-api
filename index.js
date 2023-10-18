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

    $(elmSelector).each((parentIdx, parentElem) => {
      if (parentIdx <= 9) {
        $(parentElem)
          .children()
          .each((childIdx, childElem) => {
            const tdValue = $(childElem).text();

            if (tdValue) {
              console.log(tdValue);
            }
          });
      }
    });
  } catch (err) {
    console.error(err);
  }
}

getPriceFeed();
