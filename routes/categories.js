/**
 * Created by mady on 28.10.2014.
 */

var express = require('express');
var router = express.Router();
var categories = require('../model/categories');

//router.get('/', function (req, res, next) {
//
//    categories.getAllCategories(function(err,categories){
//        if(err){
//            res.status(err.status || 500);
//            res.send(JSON.stringify({error: err.toString()}));
//            return;
//        }
//        res.header("Content-type","application/json");
//        res.end(JSON.stringify(categories));
//    })
//});




module.exports = router;