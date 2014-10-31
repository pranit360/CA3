var express = require('express');
var router = express.Router();
var orders = require('../model/orders');
var categories = require('../model/categories')
console.log("routes/orders loaded!");


router.get('/cust/:id', function (req, res) {
    var id = req.params.id;
    customers.getOrdersById(id, function (err, custOrdersList) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.render('custOrds', {custOrders: custOrdersList});
    })
});

router.get('/', function (req, res) {

    orders.getAllOrders(function (err, orders) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;

        }
        orders.sort().reverse();
        res.render('index', {title: "Order List", orderList: orders });


    })
});


/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'MongoDB Viewer' });
//});


router.get("/orderDetails/:id", function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    orders.getOrderById(id, function (err, orderDetails) {

        if (err) {

            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }

        orders.getCustomerById(id, function(err, customerDetails){
            if (err) {

                res.status(err.status || 500);
                res.send(JSON.stringify({error: err.toString()}));
                return;
                next();
            }
            orders.getEmployee(id, function(err, empDetails){
                if (err) {

                    res.status(err.status || 500);
                    res.send(JSON.stringify({error: err.toString()}));
                    return;
                    next();
                }
        res.render('details', { detailsList: orderDetails,  customerDetails: customerDetails, empDetails: empDetails});
            });

        });

//res.header("Content-Type","application/json");
        //res.send(JSON.stringify(orderDetails));
        // console.log(orderDetails);
        //console.log(orderDetails.order);
    });
});


router.get("/orderDetails/custDetails/:id", function (req, res, next) {
    console.log('gotten there');
    var id=req.params.id;
    customers.getCustomerDetails(id, function (err, custDets){
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;

        }
        res.render('custDets', {title: 'Customer details', custDets: custDets});

    });
});


router.get("/orderDetails/empDetails/:id", function (req, res) {
    console.log('gotten there');
    var id=req.params.id;
    employees.getEmployeeDetails(id, function (err, empDets){
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;

        }
        res.render('empDets', {title: 'Employee details', empDets: empDets});

    });
});


router.get('/categories', function (req, res, next) {

    categories.getAllCategories(function (err, categories) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
        res.render('cats', {title: "Category List", catList: categories });
        console.log(categories);
        next();
    })
});

// maybe the following will run if the scripts are rerun
router.get('/cats/:id', function (req, res, next) {
    var id = req.params.id;
    categories.getProductsByCategoryId(id, function (err, items) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
//        res.header("Content-type","application/json");
//        res.end(JSON.stringify(categories));
        res.render('catDes', {title: "Categories Items", itemsList: items });
        console.log(items);
        next();
    })
});


var products = require('../model/products');

router.get('/products', function (req, res, next) {

    products.getAllProducts(function (err, products) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
//        res.header("Content-type","application/json");
//        res.end(JSON.stringify(products));
        res.render('products', {title: 'Products List', prodList: products})
        console.log(products);
        next();
    })
});

var employees = require('../model/employees');

router.get('/employees', function (req, res, next) {

    employees.getAllEmployees(function (err, employees) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
        res.render('emps', {title: 'Employees', empList: employees})
        next();
    })
});

router.get('/emps/:id', function (req, res, next) {
    var id = req.params.id;
    employees.getEmployeeOrdersByID(id, function (err, empOrderList) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
        res.render('empsID', {title: 'Employees', empOrders: empOrderList})
        next();
    })
});

var customers = require('../model/customers');

router.get('/customers', function (req, res, next) {

    customers.getAllCustomers(function (err, customers) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
            next();
        }
//        res.header("Content-type","application/json");
//        res.end(JSON.stringify(customers));
        res.render('custs', {title: 'Customers List', custList: customers})
        next();
    })
});

router.get('/custDetails/:id', function(req,res){
    console.log('gotten there');
    var id=req.params.id;
    customers.getCustomerDetails(id, function (err, custDets){
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;

        }
        res.render('custDets', {title: 'Customer details', custDets: custDets})

    });
});


router.get("/orders/:id", function (req, res) {
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

router.post('/addOrder', function (req, res) {
    var order = req.body;
    console.log('Adding order: ' + JSON.stringify(order));
    //orders.tryIng('orders', function(err, result) {
    orders.save(order, {safe: true}, function (err, result) {
        res.set("Context-Type", "application/json");
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            console.log('Success: ' + JSON.stringify(result[0]));
            res.send(result[0]);
        }
    });
});
//});
//THE FOLLOWING IS ONE ROUTE FOR ADD ORDER
//IT IS COMMENTED OUT

//
//router.post("/",function(req, res,next){
//    var orderToSave = req.body;  //This works because of the app.use(bodyParser.json()) middleware
//    console.log(JSON.stringify(orders));
//    orders.saveOrder(orderToSave,function(err,savedOrder){
//        res.set("Context-Type","application/json");
//        if(err){
//            res.status(err.status || 500);
//            res.send(JSON.stringify({error: err.toString()}));
//            return;
//        }
//        res.send(JSON.stringify(savedOrder));
//    })
//});




router.put("/:id",function(req, res, next){
    var orderToUpdate = req.body;  //This works because of the app.use(bodyParser.json()) middleware
    console.log(orderToUpdate);
    console.log("Put method "+JSON.stringify(orderToUpdate));
    // console.log(JSON.stringify(orders));
    orders.updateOrder(orderToUpdate,function(err,savedOrder){
        console.log("called back");
        // res.set("Context-Type","application/json");
        if(err){
            res.status(err.status || 500);
            //  res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.send(JSON.stringify(orderToUpdate.toString));
    });
    res.send(orderToUpdate.shipCountry);

});

module.exports = router;
