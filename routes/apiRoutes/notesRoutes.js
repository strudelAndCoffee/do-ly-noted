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
    
    // checks if id is taken and assigns unique id to note
    if (notes.some(note => { note.id == notes.length})) {
        req.body.id = (notes.length + 1);
    } else {
        req.body.id = notes.length;
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

    res.send(newNotesArr);
});

module.exports = router;