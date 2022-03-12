const router = require("express").Router();
const notes = require("../../db/db");
const fs = require("fs");
const path = require("path");

// gets all notes in db.json
router.get("/notes", (req, res) => {
    res.json(notes);
});

// adds new note to db.json
router.post("/notes", (req, res) => {

    // assigns id to new note
    if (notes.length == 0) {
        // if db is empty
        req.body.id = 1;
    } else {
        // assigns id equal to current highest id + 1
        let notesIDs = [];
        notes.forEach(note => {
            notesIDs.push(note.id);
        });
        notesIDs.sort().reverse();

        req.body.id = parseInt(notesIDs[0] + 1);
    }

    // checks if note's text field is empty
    if (!req.body.text) {
        res.status(400).send("No text in input field.")
        return;
    } else {
        let notesArr = notes;
        notesArr.push(req.body);

        fs.writeFileSync(
            path.join(__dirname, "../../db/db.json"),
            JSON.stringify(notesArr, null, 2)
        );
    }

    res.send(notes);
});

// deletes note from db.json
router.delete("/notes/:id", (req, res) => {
    let delNoteId = req.params.id;
    let newNotesArr = notes.filter(note => {
        if (note.id == delNoteId) {
            return false;
        } else {
            return true;
        }
    });

    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(newNotesArr, null, 2)
    );

    res.send(notes);
});

module.exports = router;