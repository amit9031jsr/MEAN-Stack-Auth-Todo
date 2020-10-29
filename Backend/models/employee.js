const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', { //model name
    name: { type: String},  //schema or structure
    position: { type: String},
    office: { type: String},
    salary: { type: Number},
    userId: { type: String}
});

module.exports = { Employee };