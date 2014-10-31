/**
 * Created by mady on 28.10.2014.
 */
var mongoose = require('mongoose');
var model = require('../database/model');

function getAllProducts(callback) {
    console.log("Thank you god!oopp");
    model.ProductModel.find({}, function (err, products) {
        if (err) {
            return callback(err);
        }
        console.log("Success");
        callback(null, products);
    });
}

module.exports={
    getAllProducts: getAllProducts
}