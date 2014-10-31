/**
 * Created by mady on 28.10.2014.
 */
var mongoose = require('mongoose');
var model = require('../database/model');

function getAllEmployees(callback) {
    console.log("Thank you god!oopp");
    model.EmployeeModel.find({}, function (err, employees) {
        if (err) {
            return callback(err);
        }
        console.log("Success");
        callback(null, employees);
    });
}

module.exports={
    getAllEmployees: getAllEmployees
}