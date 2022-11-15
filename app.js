/**  
*
This is the main entry endpoint to my application
*
*/

const morgan = require("morgan");
const express = require("express");
const sqlite3 = require("sqlite3");

const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create new database
const db = new sqlite3.Database(__dirname + "/stortinget.database.sqlite");

const CREATE_CARD_TABLE =
  "CREATE TABLE if not exists card_table (ID INTEGER PRIMARY KEY AUTOINCREMENT, card_number INT, store TEXT, adress TEXT, date TEXT, items TEXT);";
const DROP_CARD_TABLE = "DROP TABLE if exists card_table;";

//create new table
app.get("/create", (req, res) => {
  db.run(CREATE_CARD_TABLE);
  res.send("Table created");
});

//drop table
app.get("/drop", (req, res) => {
  db.run(DROP_CARD_TABLE);
  res.send("Table dropped");
});

//drop and insert data to database
app.get("/reset", (req, res) => {
  db.run(DROP_CARD_TABLE, () => {
    console.log("Table store dropped ...");
    db.run(CREATE_CARD_TABLE, () => {
      console.log("...and re-created");
      db.run(
        "INSERT INTO card_table (card_number, store, adress, date, items) VALUES ('1345', 'Kiwi', 'Tønsberg', '12.11.22', '[{}]');"
      );
      db.run(
        "INSERT INTO card_table (card_number, store, adress, date, items) VALUES ('1343', 'Rema 1000', 'Tønsberg', '10.11.22', '[{}]');"
      );
      db.run(
        "INSERT INTO card_table (card_number, store, adress, date, items) VALUES ('7890', 'Kiwi', 'Sandefjord', '12.11.22', '[{}]');"
      );
    });
  });
  res.send("Table reset");
  res.status(200).end(); // successful
});

//list database
app.get("/", (req, res) => {
  let card_table = [];
  db.serialize(() => {
    db.each(
      "SELECT * FROM card_table",
      (err, row) => {
        card_table.push(row);
        if (err) return console.log(err.message);
      },
      () => {
        res.send(card_table);
      }
    );
  });
});

let itemcard = [];
let category = [
  "Beverages",
  "Bread/Bakery",
  "Canned/Jarred Goods",
  "Dry/Baking Goods",
  "Frozen Foods",
  "Meat",
  "Produce",
  "Cleaners",
];

//add items
app.post("/items", (req, res) => {
  let items = {
    name: req.body.name,
    category: `${category}`,
    price: req.body.price,
  };

  itemcard.push(items);
  res.send("Items added");
  res.status(201).end(); // successful post
});

app.get("/items", (req, res) => {
  res.send(itemcard);
});

//add items to card
app.post("/card", (req, res) => {
  let card_number = req.body.card_number;
  let store = req.body.store;
  let adress = req.body.adress;
  let date = req.body.date;
  const addItems = JSON.stringify(itemcard);

  db.run(
    "INSERT INTO card_table (card_number, store, adress, date, items) VALUES ('" +
      card_number +
      "',  '" +
      store +
      "',  '" +
      adress +
      "',  '" +
      date +
      "',  '" +
      addItems +
      "');",
    function (err) {
      if (err) throw err;
      res.send("Items added to card");
      res.status(201).end(); // successful post
      itemcard = []; //clear array
    }
  );
});

//search for card number 4 digits
app.get("/card/:card_number", (req, res) => {
  let card_number = [];
  db.serialize(() => {
    db.each(
      "SELECT * FROM card_table WHERE card_number = ?",
      req.params.card_number,
      (err, row) => {
        card_number.push(row.items);
        if (err) return console.log(err.message);
      },
      () => {
        res.send(JSON.parse(card_number));
      }
    );
  });
});

//search on spesific date - 00.00.00
app.get("/day/:date", (req, res) => {
  let date = [];
  db.serialize(() => {
    db.each(
      "SELECT * FROM card_table WHERE date = ?",
      req.params.date,
      (err, row) => {
        date.push(row.card_number, row.date, row.items);
        if (err) return console.log(err.message);
      },
      () => {
        res.send(date);
      }
    );
  });
});

//search on spesific month/year - 00/00
app.get("/month/:month_number/:year_number", (req, res) => {
  let year = req.params["year_number"];
  let month = req.params["month_number"];

  const monthYear = `${month + "." + year}`;

  let sortMonthYear = [];

  db.serialize(() => {
    db.each(
      "SELECT * FROM card_table WHERE substr(date, 4, 8) = ?",
      monthYear,
      (err, row) => {
        sortMonthYear.push(row.card_number, row.date, row.items);
        if (err) return console.log(err.message);
      },
      () => {
        res.send(sortMonthYear);
      }
    );
  });
});

//delete ALL data for card
app.delete("/card/:card_number", function (req, res) {
  db.serialize(() => {
    db.run(
      "DELETE FROM card_table WHERE card_number = ?",
      req.params.card_number,
      function (err) {
        if (err) {
          res.send("Error encountered while deleting card");
          return console.error(err.message);
        }
        res.send("ALL data deleted");
        res.status(200).end(); // successful delete
      }
    );
  });
});

//server “starts”
app.listen(port, () => console.log("Server is running on port:", port));
