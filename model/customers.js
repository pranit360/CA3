/**
 * Created by mady on 28.10.2014.
 */
var mongoose = require('mongoose');
var model = require('../database/model');

function getAllCustomers(callback) {
    console.log("Thank you god!oopp");
    model.CustomerModel.find({}, function (err, customers) {
        if (err) {
            return callback(err);
        }
        console.log("Success");
        callback(null, customers);
    });
}

module.exports={
    getAllCustomers: getAllCustomers
}
