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


function getEmployeeOrdersByID(id, callback){
    model.OrderModel.find({employee:id} , function(err, result){
            if (err){
                return callback(err);
            }
         callback(null,result);


        });

}

function getEmployeeDetails(id, callback){
    model.EmployeeModel.find({_id:id}, function (err, result){
        if (err){
            return callback(err);
        }
        callback(null,result);


    });
}


module.exports={
    getAllEmployees: getAllEmployees,
    getEmployeeOrdersByID: getEmployeeOrdersByID,
    getEmployeeDetails: getEmployeeDetails
}