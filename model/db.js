/**
 * Created by Kaloyan on 10/28/2014.
 */
var mongoose = require( 'mongoose' );

//Please change this to your own DB
var dbURI = 'mongodb://OrdersUser:orders@ds063909.mongolab.com:63909/orderslist'
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
