const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const fetch = require("node-fetch");

fs.readFile("./testCollection.csv", "UTF-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    convertToJson(data);
  }
});

function emptyToNull(column) {
  if (column == "") {
    return null;
  }
  return column;
}

function convertToBoolean(column) {
  if (column == "TRUE") {
    return true;
  } else if (column == "FALSE") {
    return false;
  } else if (column == "") {
    return false;
  }
}

function generateRecordId() {
  return Math.floor(Math.random() * Math.floor(1000000000));
}

function normalizeCatalogueNumber(catNo) {
  const regex = /(\s|-)/gi;
  return catNo.replace(regex, "");
}

function selectBestDiscogsMatch(discogsResults, csvCat) {
  const normalizedCsvCat = normalizeCatalogueNumber(csvCat);
  const validDiscogsResults = discogsResults.filter(result => {
    if (normalizedCsvCat == normalizeCatalogueNumber(result.catno)) {
      return true;
    }
  });
  return validDiscogsResults.reduce(
    (max, result) => (result.community.have > max.community.have ? result : max),
    validDiscogsResults[0]
  );
}

// generates JSON from read CSV file using csv-parse library
async function convertToJson(collection) {
  const rows = parse(collection, {
    columns: true
  });

  async function requestDiscogsInfo(row) {
    let discogsAlbum;
    if (row.catalogueNo !== "") {
      const discogsResults = await fetch(
        `https://api.discogs.com/database/search?catno=${row.catalogueNo}&key=PLEnZqSdtLmdphzMJZzO&secret=FgpWuGTjmNrhIrqNOnhBDEWMZYVmfOwz`
      );
      discogsAlbum = selectBestDiscogsMatch((await discogsResults.json()).results, row.catalogueNo);
      if (discogsAlbum == undefined) {
        discogsAlbum = {};
        console.log(`invalid catNo: ${row.catalogueNo}`);
      }
    } else {
      discogsAlbum = {};
    }
    return discogsAlbum;
  }
  const updatedRowsPromise = rows.map(async row => {
    const discogsAlbum = await requestDiscogsInfo(row);
    return {
      id: `${generateRecordId()}`,
      artist: emptyToNull(row.artist),
      album: emptyToNull(row.album),
      played: convertToBoolean(row.played),
      copies: [
        {
          art: discogsAlbum.cover_image,
          year: discogsAlbum.year,
          catalogueNo: emptyToNull(row.catalogueNo),
          location: emptyToNull(row.location),
          needNewJacket: emptyToNull(row.needNewCase),
          needInnerSleeve: null,
          condition: {
            sleeve: {
              rating: emptyToNull(row.sleeveRating),
              notes: emptyToNull(row.sleeveNotes)
            },
            media: {
              rating: emptyToNull(row.mediaRating),
              notes: emptyToNull(row.mediaNotes)
            }
          },
          purchasedByMe: convertToBoolean(row.purchasedByMe),
          purchaseDate: emptyToNull(row.purchaseDate)
        }
      ]
    };
  });

  const updatedRows = await Promise.all(updatedRowsPromise);

  const albums = JSON.stringify(updatedRows);
  fs.writeFileSync("albums.json", albums);
}
