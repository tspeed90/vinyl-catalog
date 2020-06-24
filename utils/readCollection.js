const fs = require("fs");
const parse = require("csv-parse/lib/sync");

fs.readFile("./vinyl_collection.csv", "UTF-8", (err, data) => {
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
function convertToJson(collection) {
  const rows = parse(collection, {
    columns: true
  });

  const updatedRows = rows.map(row => {
    return {
      artist: emptyToNull(row.artist),
      album: emptyToNull(row.album),
      played: emptyToFalse(row.played),
      copies: [
        {
          thumbUrl: null, //will be updated by discogs script
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

  const albums = JSON.stringify(updatedRows);
  fs.writeFileSync("albums.json", albums);
}
