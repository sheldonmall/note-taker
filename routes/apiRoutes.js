const fs = require("fs");

// console.log(__dirname);

const readNotes = (app) => {
  app.get("/api/notes", (req, res) => {
    fs.readFile(`${__dirname}/../db/db.json`, "utf8", (err, data) => {
      if (err) throw err;
      const jsonNotes = JSON.parse(data);
      for (let ctr = 0; ctr < jsonNotes.length; ctr++) {
        jsonNotes[ctr].id = `Note${ctr}`;
      }
      res.json(jsonNotes);
    });
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    fs.readFile(`${__dirname}/../db/db.json`, "utf8", (err, data) => {
      if (err) throw err;
      const notesArray = JSON.parse(data);
      notesArray.push(newNote);
      fs.writeFile(
        `${__dirname}/../db/db.json`,
        JSON.stringify(notesArray),
        (err2, data2) => {
          if (err2) throw err2;
          res.json(newNote);
        }
      );
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    var chosenId = parseInt(req.params.id.split("Note")[1]);
    fs.readFile(`${__dirname}/../db/db.json`, "utf8", (err, data) => {
      if (err) throw err;
      const notesArray = JSON.parse(data);
      for (var ctr = 0; ctr < notesArray.length; ctr++) {
        notesArray[ctr].id = ctr;
      }
      console.log(notesArray);
      const removeNoteIndex = notesArray
        .map((element) => element.id)
        .indexOf(chosenId);
      notesArray.splice(removeNoteIndex, 1);
      fs.writeFile(
        `${__dirname}/../db/db.json`,
        JSON.stringify(notesArray),
        (err2, data2) => {
          if (err2) throw err2;
          res.json(notesArray);
        }
      );
    });
  });
};
module.exports = readNotes;
