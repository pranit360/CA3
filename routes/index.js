var express = require('express');
var router = express.Router();
var orders = require('../model/orders');
var categories = require('../model/categories')
console.log("routes/orders loaded!");

router.get('/', function (req, res) {

    orders.getAllOrders(function(err,orders){
        if(err){
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;

        }
        orders.sort().reverse();
        res.render('index', {title:"Order List", orderList : orders });


    })
});






/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'MongoDB Viewer' });
//});



    router.get("/orderDetails/:id", function(req, res,next) {
        var id = req.params.id;
        console.log(id);
        orders.getOrderById(id,function(err,orderDetails){
            if(err){

                res.status(err.status || 500);
                res.send(JSON.stringify({error: err.toString()}));
                return;
                next();

//                return next(err.status);
                //For a better way to provide the errors see post
            }

//res.header("Content-Type","application/json");
            //res.send(JSON.stringify(orderDetails));
           // console.log(orderDetails);
            res.render('details',{ detailsList : orderDetails });
            //console.log(orderDetails.order);
        });
    });









router.get('/', function(req, res) {

    res.render('index', { title: 'MongoDB Viewer' });
});
//router.param('details', function(req, res, next, id){
//    var gotten=req.body.id;
//    //req.send('/details/'+id);
////req.params.id=gotten;
////res.render('/'+gotten);
//    res.render ('details.ejs');
//})

//router.get('details/', function(req,res)


//router.get('/details/:id', function(req, res){
//    res.send('details' + req.params.id);
//});

//
//router.param('details', function(req, res, next, id){
//    User.find(id, function(err, details){
//        if (err) {
//            next(err);
//        } else if (details) {
//            req.details = details;
//            res.render('details.ejs');
//            next();
//        } else {
//            next(new Error('failed to load user'));
//        }
//    });
//});


router.get('/categories', function (req, res, next) {

    categories.getAllCategories(function(err,categories){
        if(err){
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
        res.render('cats', {title:"Category List", catList : categories });
        console.log(categories);
        next();
    })
});

// maybe the following will run if the scripts are rerun
router.get('/cats/:id', function (req, res, next) {
    var id = req.params.id;
    categories.getProductsByCategoryId(id, function(err,items){
        if(err){
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
//        res.header("Content-type","application/json");
//        res.end(JSON.stringify(categories));
        res.render('catDes', {title:"Categories Items", itemsList : items });
        console.log(items);
        next();
    })
});


var products = require('../model/products');

router.get('/products', function (req, res, next) {

    products.getAllProducts(function(err,products){
        if(err){
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
//        res.header("Content-type","application/json");
//        res.end(JSON.stringify(products));
        res.render('products', {title:'Products List', prodList:products})
console.log(products);
        next();
    })
});

var employees = require('../model/employees');

router.get('/employees', function (req, res, next) {

    employees.getAllEmployees(function(err,employees){
        if(err){
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
        res.render('emps', {title:'Employees', empList:employees})
        next();
    })
});

var customers = require('../model/customers');

router.get('/customers', function (req, res, next) {

    customers.getAllCustomers(function(err,customers){
        if(err){
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
//        res.header("Content-type","application/json");
//        res.end(JSON.stringify(customers));
        res.render('custs', {title:'Customers List', custList:customers})
        next();
    })
});

router.get("/orders/:id",function(req,res) {
    orders.removeOrder(req.params.id, function (err, removedOrder) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: e.toString()}));
            return;
        }
        res.redirect("/");
        //res.send(JSON.stringify(removedOrder));

//        router.get('/', function (req, res, next) {

//        orders.getAllOrders(function (err, orders) {
//            if (err) {
//                res.status(err.status || 500);
//                res.send(JSON.stringify({error: err.toString()}));
//                return;
//
//            }
//            orders.sort().reverse();
//            res.render('index', {title: "Order List", orderList: orders });

//                next();
        })
//    });
//});
//
//    })
});



//router.delete("/orders/:id",function(req,res){
//    orders.removeOrder(req.params.id,function(err,removedOrder){
//        if(err){
//            res.status(err.status || 500);
//            res.send(JSON.stringify({error: e.toString()}));
//            return;
//        }
//        res.send(JSON.stringify(removedOrder));
//
//
//        //res.redirect('localhost:3000/');
//    })
//});

router.post('/addOrder', function(req, res) {
    var order = req.body;
    console.log('Adding order: ' + JSON.stringify(order));
    //orders.tryIng('orders', function(err, result) {
      OrderModel.save(order, {safe:true}, function(err, result) {

            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
//});




module.exports = router;
