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


function getCustomerById(id, callback){
    model.DetailsModel.find({order: id})
        .populate('product')
        .populate('order')
        .exec(function (err, details)
        {
            var tryThis = [];
            if(err)
            {
                callback(err);
            }

            model.OrderModel.find({})
                .populate('customer')
                .exec(function(err,deta){

                    if(err)
                    {
                        callback(err);
                    }

                    callback(null, deta);



                });

        });
}

//THE FOLLOWING IS FOR EDIT AN ORDER
function updateOrder(order,callback) {

    model.OrderModel.update({_id: order._id}, {$set: {customer: order.customer, employee: order.employee, orderDate: order.orderDate, requiredDate: order.requiredDate, requiredDate: order.requiredDate, shippedDate: order.shippedDate, shipVia: order.shipVia, freight: order.freight, shipName: order.shipName, shipAddress: order.shipAddress, shipCity: order.shipCity, shipRegion: order.shipRegion, shipPostalCode: order.shipPostalCode, shipCountry: order.shipCountry}}).exec();


//THE FOLLOWING CODE IS A POSSIBILITY TO IMPLEMENT THE ADD ORDER
// BUT IT IS COMMENTED OUT BECAUSE IT BREAKS THE DATABASE AS NO OTHER SCHEMAS
// ARE ADDED TO
//function saveOrder(order,callback){
//        p = new model.OrderModel(order);
//        p.save(function(err,createdOrder){
//            if(err){
//                return callback(err);
//            }
//            callback(null,createdOrder);
//        });
//    };


//THE FOLLOWING CODE IS A POSSIBILITY TO IMPLEMENT THE ADD ORDER
// BUT IT IS COMMENTED OUT BECAUSE IT GIVES AN ERROR
//
//function save(callback){
//    model.OrderModel.save( function(err, result) {
//
//        if(err){
//            return callback(err);
//        }
//        callback(null,result);
//
//    });
//}

}
    module.exports = {
        getAllOrders: getAllOrders,
        getOrderById: getOrderById,
        removeOrder: removeOrder,
        updateOrder: updateOrder,
        getCustomerById: getCustomerById
    }

