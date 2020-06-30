const note = require("../db/db");
const fs = require("fs");


module.exports = function (app) {
    app.get("/api/notes", function(req,res) {
            console.log("Notes Received");
            return res.json(note);
    });

    app.post("/api/notes", function(req,res) {
            let newNote = req.body;
            if (note === "") {
                newNote.id = 0;

            } else {
                newNote.id = note.length;    
            } 
            note.push(newNote);
            var noteString = JSON.stringify(note);
            fs.writeFile("db/db.json", noteString, function (err) {
                if (err) throw err;
                console.log("Note has been sent!");
                res.send();
            });          
    });

    app.delete("/api/notes/:id", function(req,res) {
            let deleteNote = (req.params.id);
            note.splice(deleteNote, 1);
            if (!note === undefined || !note.length == 0) {
                    for (let i = 0; i < note.length; i++) {
                            note[i].id = i;
                    };
            };
            fs.writeFile("db/db.json", JSON.stringify(note), (err) => {
                    if (err) throw err;
                    console.log("Note #" + deleteNote + " deleted");
                    res.send();
            });
    });
};