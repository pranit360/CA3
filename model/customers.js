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



function getOrdersById(id, callback){
    model.OrderModel.find({customer: id} , function(err, result){
        if (err){
            return callback(err);
        }
        callback(null,result);


    });

}

function getCustomerDetails(id, callback) {
    model.CustomerModel.find({_id: id}, function (err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
}

module.exports={
    getAllCustomers: getAllCustomers,
    getOrdersById: getOrdersById,
    getCustomerDetails: getCustomerDetails
}
