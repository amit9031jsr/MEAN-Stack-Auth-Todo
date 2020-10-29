const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee.js');


// Create new employee
router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
        userId: req.body.userId
    });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Save: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// Retreive all employee details
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retrieving Employees: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// Retreive all employee details
router.get('/:userId', (req, res) => {
    Employee.find({userId: req.params.userId}, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retrieving Employees: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// Update employee details
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Update: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// Delete employee data
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Delete: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;