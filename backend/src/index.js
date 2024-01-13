const e = require('express');
const express = require('express');
const fs = require('fs');

require('./db/mongoose');

const Note = require('./models/notes');

const app = express();

app.use(express.json());

app.get('/notes', async (request, response) => {
    try {
        const notes = await Note.find({})
        response.send(notes)
    }
    catch (err) {
        response.status(500).send(err)
    }
    
})

app.post('/notes', async (req, res) => {
    const note = new Note({
        note: req.body.note
    })

    try {
        await note.save()
        res.status(201).send(note)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.patch('/updateNotes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).send()
        }

        note.note = req.body.note
        await note.save()

        res.status(201).send(note)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.delete('/notes/:id', async (req, res) => {

    try {
        const note = await Note.findByIdAndDelete(req.params.id)

        if (!note) {
            return res.status(404).send()
        }
        res.send("The note has been deleted")
    } catch (err) {
        res.status(400).send(err)
    }
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})