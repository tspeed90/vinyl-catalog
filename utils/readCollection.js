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

function emptyToFalse(column) {
  if (column == "") {
    return false;
  }
  return column;
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
      console.log(discogsResults.headers);
      discogsAlbum = (await discogsResults.json()).results[0];
    } else {
      discogsAlbum = {};
    }
    return discogsAlbum;
  }
  const updatedRowsPromise = rows.map(async row => {
    const discogsAlbum = await requestDiscogsInfo(row);
    return {
      artist: emptyToNull(row.artist),
      album: emptyToNull(row.album),
      played: emptyToFalse(row.played),
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
          purchasedByMe: emptyToFalse(row.purchasedByMe),
          purchaseDate: emptyToNull(row.purchaseDate)
        }
      ]
    };
  });

  const updatedRows = await Promise.all(updatedRowsPromise);

  const albums = JSON.stringify(updatedRows);
  fs.writeFileSync("albums.json", albums);
}
