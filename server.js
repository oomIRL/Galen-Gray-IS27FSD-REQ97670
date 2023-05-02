const express = require('express');
const mongoose = require('mongoose');
const Staff = require('./models/staff');
require('dotenv').config();
const cors = require('cors');
const corsOptions ={
   origin:'*'
   //credentials: true,
   //origin: true,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((results) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err));

// Redirect root to /staff
app.get('/', (req, res) => {
    res.redirect('/staff')
});

// Get Staff
app.get('/staff', (req, res) => {
    Staff.find().sort({ level: 1  })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        })
});

// Get one Staff by ID
app.get('/staff/:id', (req, res) => {
    const id = req.params.id;
    Staff.findById(id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        })
})

// Create new staff member
app.post('/staff', (req, res) => {
    const newStaff = new Staff({
        name: req.body.name,
        title: req.body.title,
        employeeid: req.body.employeeid,
        position: req.body.position,
        level: req.body.level,
        lead: req.body.lead
    });
    try {
        const savedStaff = newStaff.save();
        res.status(200).json(savedStaff);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Update existing staff by ID
app.put('/staff/:id', (req, res) => {
    const id = req.params.id;
    Staff.findByIdAndUpdate(id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        })
});

// Delete staff by ID
app.delete('/staff/:id', (req, res) => {
    const id = req.params.id;
    Staff.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        })
});