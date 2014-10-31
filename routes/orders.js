
/**
 * Created by Kaloyan on 10/28/2014.
 */

var express = require('express');
var router = express.Router();
var orders = require('../model/orders');

console.log("routes/orders loaded!");

router.get('/', function (req, res, next) {

    orders.getAllOrders(function(err,orders){
        if(err){
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type","application/json");
        res.end(JSON.stringify(orders));
    })
});

router.get("/:id", function(req, res,next) {
    var id = req.params.id;
    orders.getOrderById(id,function(err,order){
        if(err){
            return next(err.status);
            //For a better way to provide the errors see post
        }
        order.sort().reverse();
        res.header("Content-Type","application/json");
        res.end(JSON.stringify(order));
    })
});



module.exports = router;