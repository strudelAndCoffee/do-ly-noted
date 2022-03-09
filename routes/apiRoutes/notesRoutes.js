const router = require("express").Router();
const notes = require("../../db/db");
const fs = require("fs");
const path = require("path");

router.get("/notes", (req, res) => {
    res.send(notes);
});

router.post("/notes", (req, res) => {
    req.body.id = notes.length;
    if (!req.body.text) {
        res.status(400).send("No text in input field.")
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

module.exports = router;