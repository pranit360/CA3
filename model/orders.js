/**
 * Created by Kaloyan on 10/28/2014.
 */

var mongoose = require('mongoose');
var model = require('../database/model');

function getAllOrders(callback) {
    console.log("Thank you god!");
    model.OrderModel.find({})
        .populate('customer')
        .exec(function (err, orders) {

        console.log("findMethod");
        if (err) {
            console.log("orderfinder");
            return callback(err);
        }
        console.log("Success");
       callback(null, orders);
    });
}

function getOrderById(id, callback) {
    model.DetailsModel.find({order: id})
        .populate('order')
        .populate('product')
        .exec(function (err, details) {

            model.OrderModel.populate(details,'customer', function (err, details) {

                    if (err) {
                        callback(err);
                    }
                    console.log(details);
                    callback(null, details);
                 });
            });
            }
//    model.DetailsModel.find({order: id})
//        .populate('product')
//        .exec(function(err, details) {
//            console.log(details);
//        });

function removeOrder(id, callback){
    model.OrderModel.remove({_id: parseInt(id)}, function(err, removedOrder){
        if(err){
            return callback(err);
        }
        callback(null,removedOrder);
        console.log("trying to delete: " + id);
//        getAllOrders(callBack);
    });
}

function tryIng(callback){
    model.OrderModel.save( function(err, result) {

        if(err){
            return callback(err);
        }
        callback(null,result);

    });
}


module.exports={
    getAllOrders: getAllOrders,
    getOrderById: getOrderById,
    removeOrder: removeOrder,
    tryIng: tryIng
}
