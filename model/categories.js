/**
 * Created by mady on 28.10.2014.
 */
var mongoose = require('mongoose');
var model = require('../database/model');

function getAllCategories(callback) {
    console.log("Thank you god!oopp");
    model.CategoryModel.find({}, function (err, categories) {
        if (err) {
            console.log("orderfinder");
            return callback(err);
        }
        console.log("Success");
        callback(null, categories);
    });
}

function getProductsByCategoryId(id, callback) {
    model.ProductModel.find({category:id}, function (err, products) {
        if (err) {
            return callback(err);
        }
        callback(null, products);
    });
}

module.exports={
    getAllCategories: getAllCategories,
    getProductsByCategoryId: getProductsByCategoryId
}
