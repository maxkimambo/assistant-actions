const response = require("./responseUser");
const request = require("r2");
const parser = require("cheerio");
const cheerio = require("cheerio");
const _ = require("lodash");
const tramInfo = function(req, res, next) {
  //   console.log(JSON.stringify(req.body, null, 4));

  const stationUrl =
    "http://mobil.bvg.de/Fahrinfo/bin/stboard.bin/dox?input=" +
    "+Loeperplatz+%28Berlin%29&REQ0JourneyStopsSID=A%3D1%40O%3DLoeperplatz+" +
    "%28Berlin%29%40X%3D13479918%40Y%3D52520070%40U%3D86%40L%3D900160017%40B%3D1%" +
    "40p%3D1513255073%40&HWAI%3DJS%21js=yes&HWAI%3DJS%21ajax=yes&start=Suchen&boardType=depRT";

  fetchStationInfo(stationUrl)
    .then(html => {
      return extractResults(html);
    })
    .then(trams => {
      return _.slice(trams, 3);
    })
    .then(results => {
      const responseString = makeResponse(results);
      console.log(responseString);

      res.send(response(responseString));
    })
    .catch(err => {
      console.error(err);
    });
};

const fetchStationInfo = async url => {
  // grab data from bvg
  const html = await request(url).text;
  //   console.log(html);
  return html;
};

const extractResults = async html => {
  let results = [];
  const $ = parser.load(html);

  const rows = $("td", "table>tbody>tr");
  const dataRows = rows.text().split("\n");
  const filteredRows = dataRows.filter(d => {
    return d;
  });

  const dataChunks = _.chunk(filteredRows, 3);

  for (c of dataChunks) {
    let r = {};
    r.time = c[0];
    r.line = c[1];
    r.destination = c[2];

    results.push(r);
  }

  return results;
};

const makeResponse = nextTrams => {
  let userResponse = "Hi ";

  let responseArray = nextTrams.map(tram => {
    return `there is a ${tram.line} coming at ${tram.time} going in direction ${
      tram.destination
    }`;
  });
  const finalResponse = responseArray.join(", as well ");

  return finalResponse;
};

module.exports = tramInfo;
