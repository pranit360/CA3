/**
 * Created by mady on 28.10.2014.
 */
var express = require('express');
var router = express.Router();

router.get('/:id', function(req,res){
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

module.exports = router;